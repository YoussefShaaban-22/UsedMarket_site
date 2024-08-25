import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShippingpolicyComponent } from './view-shippingpolicy.component';

describe('ViewShippingpolicyComponent', () => {
  let component: ViewShippingpolicyComponent;
  let fixture: ComponentFixture<ViewShippingpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewShippingpolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewShippingpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
