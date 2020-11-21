import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SvgDefsComponent } from './svg-defs.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';

describe('SvgDefsComponent', () => {
  let component: SvgDefsComponent;
  let fixture: ComponentFixture<SvgDefsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SvgDefsComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgDefsComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create svg component', async(() => {
    expect(component).toBeTruthy();
  }));


});
