import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// App
import { CoreModule } from './core.module';
import { AppRouterModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Shared
import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';
import { AppBootstrapModule } from '@shared/bootstrap/app.bootstrap.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRouterModule,
    SharedModule,
    HttpModule,
    ComponentsModule,
  ],
  providers: [AppBootstrapModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
