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
  ],
  providers: [
    AppBootstrapModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
