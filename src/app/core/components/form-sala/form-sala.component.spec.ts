import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSalaComponent } from './form-sala.component';
import { FechaduraService } from '../../services/fechadura.service';
import { SalasService } from '../../services/salas.service';
import { Toast } from '../../utils/toast';

describe('FormSalaComponent', () => {
  let component: FormSalaComponent;
  let fixture: ComponentFixture<FormSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSalaComponent],
      providers: [
        {
          provide: FechaduraService,
          useValue: {
            buscar: jasmine.createSpy('buscar').and.resolveTo([])
          }
        },
        {
          provide: SalasService,
          useValue: {
            cadastrar: jasmine.createSpy('cadastrar').and.resolveTo(undefined)
          }
        },
        {
          provide: Toast,
          useValue: { show: jasmine.createSpy('show') }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require required fields', () => {
    expect(component.form.invalid).toBeTrue();
    expect(component.form.get('nome')?.hasError('required')).toBeTrue();
  });
});
