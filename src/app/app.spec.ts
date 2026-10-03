import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { App } from './app';
import { TokenService } from './core/services/token.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/login',
            navigate: jasmine.createSpy('navigate')
          }
        },
        {
          provide: TokenService,
          useValue: {
            hasToken: () => false,
            isTokenValid: () => false,
            getDecodedPayload: () => null,
            saveToken: () => undefined,
            removeToken: () => undefined
          }
        },
        {
          provide: MatDialog,
          useValue: { open: jasmine.createSpy('open') }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
