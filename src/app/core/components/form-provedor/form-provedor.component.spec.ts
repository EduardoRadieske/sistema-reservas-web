import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProvedorComponent } from './form-provedor.component';
import { ProvedorService } from '../../services/provedor.service';
import { Toast } from '../../utils/toast';

describe('FormProvedorComponent', () => {
  let component: FormProvedorComponent;
  let fixture: ComponentFixture<FormProvedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProvedorComponent],
      providers: [
        {
          provide: ProvedorService,
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

    fixture = TestBed.createComponent(FormProvedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require provider and credentials', () => {
    expect(component.form.invalid).toBeTrue();
    expect(component.form.get('provedor')?.hasError('required')).toBeTrue();
  });
});
