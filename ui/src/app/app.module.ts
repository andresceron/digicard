import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// App
import { CoreModule } from './core.module';
import { AppRouterModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Shared
import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';
import { AppBootstrapModule } from '@shared/bootstrap/app.bootstrap.module';
import { AuthInterceptor } from '@interceptors/auth.interceptor';

// Cookies Module
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';

// GA & GTM
import { environment } from 'environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

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

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgcCookieConsentModule.forRoot(cookieConfig),
    BrowserAnimationsModule,
    CoreModule,
    AppRouterModule,
    SharedModule,
    HttpClientModule,
    ComponentsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AppBootstrapModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: 'googleTagManagerId',
      useValue: environment.googleTagManagerId
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
