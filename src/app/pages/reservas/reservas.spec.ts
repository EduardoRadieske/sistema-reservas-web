import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Reservas } from './reservas';
import { ReservasService } from '../../core/services/reservas.service';
import { TokenService } from '../../core/services/token.service';
import { SalasService } from '../../core/services/salas.service';

describe('Reserva', () => {
  let component: Reservas;
  let fixture: ComponentFixture<Reservas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reservas],
      providers: [
        {
          provide: ReservasService,
          useValue: {
            registrarReserva: jasmine.createSpy('registrarReserva').and.resolveTo(undefined)
          }
        },
        {
          provide: TokenService,
          useValue: {
            getDecodedPayload: () => ({ jti: '42' })
          }
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        },
        {
          provide: SalasService,
          useValue: {
            buscarSalas: jasmine.createSpy('buscarSalas').and.resolveTo([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Reservas);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate date ordering', () => {
    expect(component.dataMaior('2026-10-03T12:00:00', '2026-10-03T14:00:00')).toBeFalse();
    expect(component.dataMaior('2026-10-03T15:00:00', '2026-10-03T14:00:00')).toBeTrue();
  });
});
