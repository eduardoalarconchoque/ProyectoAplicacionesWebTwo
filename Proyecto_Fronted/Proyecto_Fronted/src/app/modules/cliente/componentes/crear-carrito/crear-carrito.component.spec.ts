import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCarritoComponent } from './crear-carrito.component';

describe('CrearCarritoComponent', () => {
  let component: CrearCarritoComponent;
  let fixture: ComponentFixture<CrearCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
