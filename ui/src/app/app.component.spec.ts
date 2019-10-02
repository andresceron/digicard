import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SvgDefsComponent } from '@components/svg-defs/svg-defs.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SvgDefsComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule
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
    expect(ro).not.toBeNull();
  }));
});
