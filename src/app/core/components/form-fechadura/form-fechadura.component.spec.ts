import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFechaduraComponent } from './form-fechadura.component';

describe('FormFechaduraComponent', () => {
  let component: FormFechaduraComponent;
  let fixture: ComponentFixture<FormFechaduraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFechaduraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFechaduraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
