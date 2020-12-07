import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataListComponent } from './data-list.component';
import { SharedModule } from '@modules/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DataListComponent', () => {
  let component: DataListComponent;
  let fixture: ComponentFixture<DataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataListComponent
      ],
      imports: [
        SharedModule
      ],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create DataListComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should @output itemEvent with object data', () => {

    const arr = [
      {
        prop1: 'value1'
      },
      {
        prop2: 'value2'
      },
    ];

    const obj = {
      prop2: 'value2'
    };

    const idx = 1;

    component.clickedFavItem(arr, obj, idx);
    fixture.detectChanges();
    component.itemEvent.subscribe(result => {
      expect(result).toEqual({arr, obj, idx});
    });

    component.itemEvent.next({arr, obj, idx});

  });

});
