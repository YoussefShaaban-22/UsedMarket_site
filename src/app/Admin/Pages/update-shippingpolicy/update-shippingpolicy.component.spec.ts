import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShippingpolicyComponent } from './update-shippingpolicy.component';

describe('UpdateShippingpolicyComponent', () => {
  let component: UpdateShippingpolicyComponent;
  let fixture: ComponentFixture<UpdateShippingpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateShippingpolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateShippingpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
