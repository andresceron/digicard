import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'sc-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit, AfterViewInit {
  public isSticky: boolean = false;
  public pageId: string = 'home';
  public toggleMenu: boolean;
  public innerWidth: boolean;
  private menuItems: any;

  constructor(
    private router: Router,
    private wowService: NgwWowService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.wowService.init({
          scrollContainer: '#scrollContainer' as any
        });
      }
    });
  }

  @ViewChild('home', {read: ElementRef, static:false}) homeElement: ElementRef;
  @ViewChild('why', {read: ElementRef, static:false}) whyElement: ElementRef;
  @ViewChild('features', {read: ElementRef, static:false}) featuresElement: ElementRef;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;

    if (this.homeElement.nativeElement.scrollHeight < document.documentElement.scrollTop - 73 ||
      this.homeElement.nativeElement.scrollHeight > this.whyElement.nativeElement.scrollHeight) {
      this.renderer.addClass(this.menuItems[0], 'active');
      this.renderer.removeClass(this.menuItems[1], 'active');
      this.renderer.removeClass(this.menuItems[2], 'active');
    }

    if (this.whyElement.nativeElement.scrollHeight < document.documentElement.scrollTop - 73 ||
      this.whyElement.nativeElement.scrollHeight > this.featuresElement.nativeElement.scrollHeight) {
      this.renderer.addClass(this.menuItems[1], 'active');
      this.renderer.removeClass(this.menuItems[0], 'active');
      this.renderer.removeClass(this.menuItems[2], 'active');
    }

    if (this.featuresElement.nativeElement.scrollHeight < document.documentElement.scrollTop - 73) {
      this.renderer.addClass(this.menuItems[2], 'active');
      this.renderer.removeClass(this.menuItems[0], 'active');
      this.renderer.removeClass(this.menuItems[1], 'active');
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth < 992;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth < 992;
  }

  public clickedMenu(sel) {
    this.pageId = sel;
  }

  ngAfterViewInit(): void {
    this.menuItems = this.el.nativeElement.querySelectorAll('.page-scroll');
  }
}
