import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[appCustomDirective]',
  standalone: true
})
export class CustomDirectiveDirective implements OnInit{

  @Input() appCustomDirective: number = 0;
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    this.loopThrough();
  }


  loopThrough() {
    for (let i = 0; i < this.appCustomDirective; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }

}
