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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '@interceptors/auth.interceptor';

// Social Login
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('374138893031-b8m61et7aih54ao8t4c17v1b2arbd5vf.apps.googleusercontent.com')
  }
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider("Facebook-App-Id")
  // }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRouterModule,
    SharedModule,
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule,

    // Social Login
    SocialLoginModule
  ],
  providers: [
    AppBootstrapModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
