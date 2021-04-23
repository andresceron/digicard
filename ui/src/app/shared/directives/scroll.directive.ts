import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({ selector: '[scroll]' })
export class ScrollDirective {

  @Input() scrollClass: string;
  @Input() scrollHeight = 20;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('window:scroll', [])
  onScroll() {
    // console.log(window.scrollY);
    if (this.el.nativeElement.scrollTop < this.scrollHeight) {
      // this.renderer.addClass(this.el.nativeElement, this.scrollClass);
    } else {
      // this.renderer.removeClass(this.el.nativeElement, this.scrollClass);
    }
  }

}
