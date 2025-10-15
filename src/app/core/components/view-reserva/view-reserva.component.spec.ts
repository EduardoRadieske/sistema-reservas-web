import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReservaComponent } from './view-reserva.component';

describe('ViewReservaComponent', () => {
  let component: ViewReservaComponent;
  let fixture: ComponentFixture<ViewReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
