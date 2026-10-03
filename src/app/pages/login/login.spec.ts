import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Login } from './login';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        {
          provide: AuthService,
          useValue: {
            processarLogin: jasmine.createSpy('processarLogin').and.resolveTo('fake-token')
          }
        },
        {
          provide: TokenService,
          useValue: {
            saveToken: jasmine.createSpy('saveToken')
          }
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
