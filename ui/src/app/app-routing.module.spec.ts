import { TestBed, async } from '@angular/core/testing';
import { routes } from './app-routing.module';

describe('app-router.module', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [],
      schemas: []
    }).compileComponents();
  }));

  it('should not have empty has path', () => {
    // expect(routes[0].path).to('');
  });

  it('base route should contain path Login', () => {
    expect(routes[1].path).toBe('login');
  });

  it('should have ** as path', () => {
    expect(routes[8].path).toBe('**');
  });
});
