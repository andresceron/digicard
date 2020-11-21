import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SortbyComponent } from './sortby.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SortbyComponent', () => {
  let component: SortbyComponent;
  let fixture: ComponentFixture<SortbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SortbyComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortbyComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create sortby component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should execute tabClicked and change order to DESC', async(() => {

    const clickedItemDummy = {
      order: 'asc',
    };

    const updatedItemDummy = {
      order: 'desc',
    };

    component.tabClicked(clickedItemDummy);
    component.tabEvent.subscribe(result => {
      expect(result.order).toBe(updatedItemDummy.order);
    });

    component.tabEvent.next(updatedItemDummy);

  }));

  it('Should execute tabClicked and change order to ASC', async(() => {

    const clickedItemDummy = {
      order: 'desc',
    };

    const updatedItemDummy = {
      order: 'asc',
    };

    component.tabClicked(clickedItemDummy);
    component.tabEvent.subscribe(result => {
      expect(result.order).toBe(updatedItemDummy.order);
    });

    component.tabEvent.next(updatedItemDummy);

  }));

  it('Testing the output of tabEvent with updated value', async(() => {

    const clickedItemDummy = {
      title: 'Company',
      type: 'brand',
      order: 'desc',
      isActive: false
    };

    const updatedItemDummy = {
      title: 'Company',
      type: 'brand',
      order: 'desc',
      isActive: true
    };

    component.tabClicked(clickedItemDummy);
    fixture.detectChanges();
    component.tabEvent.subscribe(result => {
      expect(result).toBe(updatedItemDummy);
    });

    component.tabEvent.next(updatedItemDummy);

  }));

  it('Should change the value from of all items.isActive to false', async(() => {
    const clickedItemDummy = {
      title: 'Company1',
      type: 'brand1',
      order: 'desc',
      isActive: false
    };

    component.items = [
      {
        title: 'Company1',
        type: 'brand1',
        order: 'desc',
        isActive: true
      },
      {
        title: 'Company2',
        type: 'brand2',
        order: 'desc',
        isActive: false
      }
    ];

    component.tabClicked(clickedItemDummy);
    fixture.detectChanges();

    expect(component.items[0].isActive).toBeFalsy();

  }));

});
