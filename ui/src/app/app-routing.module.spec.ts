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

  it('should not have \'\' has path', () => {
    // expect(routes[0].path).to('');
  });

  it('base route should contain path Login', () => {
    expect(routes[0].path).toBe('login');
    // expect(routes[1].loadChildren).toContain('./routes/+login/login.module');
  });

  it('should have ** as path', () => {
    expect(routes[6].path).toBe('**');
  });

});
