import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRefundComponent } from './view-refund.component';

describe('ViewRefundComponent', () => {
  let component: ViewRefundComponent;
  let fixture: ComponentFixture<ViewRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRefundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
