import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionPagoComponent } from './opcion-pago.component';

describe('OpcionPagoComponent', () => {
  let component: OpcionPagoComponent;
  let fixture: ComponentFixture<OpcionPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpcionPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
