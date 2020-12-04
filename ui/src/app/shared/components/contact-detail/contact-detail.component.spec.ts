import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ContactDetailComponent } from './contact-detail.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';
import { AuthService } from '@services/auth.service';
import { AuthServiceStub } from '../../../stubs';

  xdescribe('ContactDetailComponent', () => {
  let component: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactDetailComponent,
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
    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create contact-detail component', async(() => {
    expect(component).toBeTruthy();
  }));

});
