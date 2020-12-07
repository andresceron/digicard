import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CardComponent } from './card.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';
import { AuthService } from '@services/auth.service';
import { AuthServiceStub } from '../../../stubs';

  xdescribe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
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
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create card component', async(() => {
    expect(component).toBeTruthy();
  }));

});
