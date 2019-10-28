import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SearchbarComponent } from '@components/searchbar/searchbar.component';
import { SortbyComponent } from '@components/sortby/sortby.component';
import { DataListComponent } from '@components/data-list/data-list.component';
import { SvgComponent } from '@components/svg/svg.component';
import { ModalComponent } from '@components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared.module';
import { ApiService } from '@services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalService } from '@components/modal/shared/modal.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of as observableOf } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: ApiService;
  let apiSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        SearchbarComponent,
        SortbyComponent,
        DataListComponent,
        SvgComponent,
        ModalComponent,
      ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ApiService,
        ModalService,
        ClientStorage
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = fixture.debugElement.injector.get(ApiService);
    apiSpy = spyOn(apiService, 'get').and.returnValue(observableOf(dummyData));
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('should make api call and return data', () => {
    expect(apiSpy).toHaveBeenCalled();
    expect(component.list).toEqual(dummyData);
  });

  it('should load items 1, 2 from LocalStorage', () => {
    const dummyIds = ['1', '2'];

    component.dataSavedIDs = dummyIds;
    expect(component.dataSavedIDs).toEqual(dummyIds);

  });

  it('should get a list of saved items', () => {
    expect(apiSpy).toHaveBeenCalled();

    component.savedList = dummySaved;

    expect(component.savedList).toEqual(dummySaved);

  });

});
