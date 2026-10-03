import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReservaComponent } from './view-reserva.component';
import { ReservasService } from '../../services/reservas.service';

describe('ViewReservaComponent', () => {
  let component: ViewReservaComponent;
  let fixture: ComponentFixture<ViewReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReservaComponent],
      providers: [
        {
          provide: ReservasService,
          useValue: {
            buscarSenhaReserva: jasmine.createSpy('buscarSenhaReserva').and.resolveTo({ codigo: '4321' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewReservaComponent);
    component = fixture.componentInstance;
    component.reserva = {
      id: 1,
      sala: 'Sala A',
      usuario: 'Maria',
      data: new Date('2026-10-03T10:00:00'),
      horario: '10:00 - 11:00'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event', () => {
    spyOn(component.fechar, 'emit');
    component.fecharPopup();
    expect(component.fechar.emit).toHaveBeenCalled();
  });
});
