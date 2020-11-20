import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SearchbarComponent } from './searchbar.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';

xdescribe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchbarComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create sortby component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should init with empty query', () => {
    fixture.detectChanges();

    component.searchValue.subscribe(result => {
      expect(result).toBe('');
    });

    component.searchValue.next('');

  });

});
