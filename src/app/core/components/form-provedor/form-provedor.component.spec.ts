import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProvedorComponent } from './form-provedor.component';

describe('FormProvedorComponent', () => {
  let component: FormProvedorComponent;
  let fixture: ComponentFixture<FormProvedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProvedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProvedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
