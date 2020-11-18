import { TestBed, async } from '@angular/core/testing';
import { routes } from './app-routing.module';

describe('app-router.module', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
      ],
      providers: [
      ],
      schemas: []
    }).compileComponents();
  }));

  it('should have \'\' has path', () => {
    expect(routes[0].path).toBe('');
  });

  it('base route should contain loadChildren #HomeModule', () => {
    expect(routes[0].loadChildren).toContain('./routes/+home/home.module#HomeModule');
  });

  it('should have ** as path', () => {
    expect(routes[1].path).toBe('**');
  });

});
