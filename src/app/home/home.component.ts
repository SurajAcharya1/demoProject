import {Component, OnInit} from '@angular/core';
import {
  NbContextMenuModule,
  NbLayoutModule,
  NbMenuItem,
  NbMenuModule, NbMenuService, NbSearchModule,
  NbSidebarModule, NbUserModule
} from "@nebular/theme";
import {Router, RouterOutlet} from "@angular/router";
import {filter, map} from "rxjs";
import {LocalStorageUtil} from "../utils/LocalStorageUtil";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    RouterOutlet,
    NbUserModule,
    NbSearchModule,
    NbContextMenuModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private nbMenuService: NbMenuService, private router: Router) {
  }

  items: NbMenuItem[] = [
    {
      title: 'Dashboard',
      link: '/home/dashboard',
      badge:  {
        text: '30',
        status: 'primary',
      }
    },
    {
      title: 'Setting',
      link: '/home/settings'
    },
    {
      title: 'Profile',
      link: '/home/profile'
    },
    {
      title: 'Game',
      link: '/home/game'
    },
    {
      title: 'Form',
      link: '/home/form'
    }
  ];

  sidebarStatus: 'expanded' | 'compacted' = "expanded";

  contextMenuItems = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  localStorage = LocalStorageUtil.getStorage();

  ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .pipe(
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title === 'Logout') {
          LocalStorageUtil.clearStorage();
          this.router.navigate(['/'])
        }
        if (title === 'Profile') {
          this.router.navigate(['/home/profile'])
        }
      });
  }

  expandCollapse(status: string) {
    if (status === 'expanded') {
      this.sidebarStatus = 'compacted';
    } else {
      this.sidebarStatus = 'expanded';
    }
  }
}

