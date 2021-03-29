import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SvgDefsComponent } from '@components/svg-defs/svg-defs.component';

import { SharedModule } from '@modules/shared.module';
import { BrowserModule, By } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgcCookieConsentConfig, NgcCookieConsentModule, NgcCookieConsentService } from 'ngx-cookieconsent';
import { of } from 'rxjs';
import { CoreModule } from './core.module';
import { AppRouterModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    events: of(NavigationEnd)
  };

  const cookieConfig: NgcCookieConsentConfig = {
    cookie: {
      domain: 'socialar.app'
    },
    position: 'bottom',
    theme: 'edgeless',
    palette: {
      popup: {
        background: '#264d7d',
        text: '#ffffff',
        link: '#ffffff'
      },
      button: {
        background: '#ffffff',
        text: '#000000',
        border: 'transparent'
      }
    },
    type: 'info',
    content: {
      message: 'This website uses cookies to ensure you get the best experience on our website.',
      dismiss: 'Got it!',
      link: 'Learn more',
      href: '/legal',
      policy: 'Cookie Policy'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SvgDefsComponent
      ],
      imports: [
        NgcCookieConsentModule.forRoot(cookieConfig),
        BrowserModule,
        CoreModule,
        AppRouterModule,
        SharedModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        NgcCookieConsentService,
        {
          provide: Router,
          useValue: mockRouter
        },
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have a router outlet', async(() => {
    const ro = fixture.debugElement.query(By.directive(RouterOutlet));
    console.log(ro);
    expect(ro).not.toBeNull();
  }));
});
