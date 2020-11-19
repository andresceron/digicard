import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TitleComponent } from './title.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';
import { AuthService } from '@services/auth.service';
import { AuthServiceStub } from '../../../stubs';

  xdescribe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TitleComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create title component', async(() => {
    expect(component).toBeTruthy();
  }));

});
