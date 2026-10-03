import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFechaduraComponent } from './form-fechadura.component';
import { ProvedorService } from '../../services/provedor.service';
import { FechaduraService } from '../../services/fechadura.service';
import { Toast } from '../../utils/toast';

describe('FormFechaduraComponent', () => {
  let component: FormFechaduraComponent;
  let fixture: ComponentFixture<FormFechaduraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFechaduraComponent],
      providers: [
        {
          provide: ProvedorService,
          useValue: {
            buscar: jasmine.createSpy('buscar').and.resolveTo([])
          }
        },
        {
          provide: FechaduraService,
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

    fixture = TestBed.createComponent(FormFechaduraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return provider description', () => {
    expect(component.getDescricaoProvedor('1')).toBe('Tuya');
  });
});
