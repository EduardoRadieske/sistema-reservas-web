import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserComponent } from './form-user.component';
import { UsuarioService } from '../../services/usuarios.service';
import { Toast } from '../../utils/toast';

describe('FormUserComponent', () => {
  let component: FormUserComponent;
  let fixture: ComponentFixture<FormUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUserComponent],
      providers: [
        {
          provide: UsuarioService,
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

    fixture = TestBed.createComponent(FormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require user data', () => {
    expect(component.form.invalid).toBeTrue();
    expect(component.form.get('nome')?.hasError('required')).toBeTrue();
  });
});
