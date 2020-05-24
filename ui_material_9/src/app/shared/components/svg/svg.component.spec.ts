import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SvgComponent } from './svg.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';

describe('SvgComponent', () => {
  let component: SvgComponent;
  let fixture: ComponentFixture<SvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SvgComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create svg component', async(() => {
    expect(component).toBeTruthy();
  }));


});
