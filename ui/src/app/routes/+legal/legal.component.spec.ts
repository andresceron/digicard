import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { LegalComponent } from './legal.component';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ActivatedRouteStub } from 'app/stubs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShareComponent', () => {
  let component: LegalComponent;
  let fixture: ComponentFixture<LegalComponent>;

  const routeStub = new ActivatedRouteStub();

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LegalComponent
      ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: routeStub
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create share component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and set paramMap subscription with no params', () => {
    routeStub.setParamMap({});
    fixture.detectChanges();
    expect(component.section).toBeFalsy();
  });

  it('should call ngOnInit and set paramMap subscription with valid params', () => {
    routeStub.setParamMap({ section: 'terms-conditions' });
    fixture.detectChanges();
    expect(component.section).toBe('terms-conditions');
    expect(component.pdfSource).toBe('/assets/docs/legal_terms-conditions.pdf');
  });

  it('should call goToPage and redirect to legal/{section}', () => {
    component.goToPage('terms-conditions');
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/legal/terms-conditions`]);
  });

});
