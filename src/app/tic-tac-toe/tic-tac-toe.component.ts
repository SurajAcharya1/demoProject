import {Component, ElementRef, OnInit} from '@angular/core';
import {NbButtonModule} from "@nebular/theme";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [
    NbButtonModule,
    NgIf
  ],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss'
})
export class TicTacToeComponent implements OnInit{

  constructor(private el: ElementRef) {
  }

  circle = true;
  won = false;
  winningCells: number[] = [];

  winMap: Map<number, number[][]> = new Map<number, number[][]>([
    [0, [[0, 1, 2], [0, 3, 6], [0, 4, 8]]],
    [1, [[0, 1, 2], [1, 4, 7]]],
    [2, [[0, 1, 2], [2, 5, 8], [2, 4, 6]]],
    [3, [[0, 3, 6], [3, 4, 5]]],
    [4, [[1, 4, 7], [3, 4, 5], [0, 4, 8],  [2, 4, 6]]],
    [5, [[3, 4, 5], [2, 5, 8]]],
    [6, [[0, 3, 6], [6, 7, 8], [2, 4, 6]]],
    [7, [[1, 4, 7], [6, 7, 8]]],
    [8, [[2, 5, 8], [6, 7, 8], [0, 4, 8]]]
  ]);

  ngOnInit() {
    const element = document.getElementsByTagName('td')!;
    for (let i = 0; i < element.length; i++) {
      element[i].addEventListener('click', ev => {
        if (!this.won) {
          const target = ev.target as HTMLElement;
          if (!target.innerHTML) {
            target.innerHTML = this.circle ? 'O' : 'X';
            this.circle = !this.circle;
            const result = this.checkForWin(element, i);
            this.won = result.won;
            this.winningCells = result.indices || [];
          }

          if (this.won && this.winningCells.length > 0) {
            const highlightClass = 'highlight-section';
            this.winningCells.forEach(index => {
              element[index].className = highlightClass;
            });
          }
        } else {
          window.alert('Cannot update the board, game is already finished');
        }
      });
    }
  }

  checkForWin(element: HTMLCollectionOf<HTMLTableCellElement>,
              clickedIndex: number): { won: boolean; indices?: number[] } {
    const patterns = this.winMap.get(clickedIndex);
    const checkCharacter = element[clickedIndex].innerHTML;
    if (patterns) {
      for (const pattern of patterns) {
        if (
          element[pattern[0]].innerHTML === checkCharacter &&
          element[pattern[1]].innerHTML === checkCharacter &&
          element[pattern[2]].innerHTML === checkCharacter
        ) {
          return { won: true, indices: pattern };
        }
      }
    }
    return { won: false };
  }

  resetGame() {
    const cells = document.getElementsByTagName('td');
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = '';
      cells[i].className = '';
    }
    this.circle = true;
    this.won = false;
    this.winningCells = [];
  }

}
