import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInquiryComponent } from './list-inquiry.component';

describe('ListInquiryComponent', () => {
  let component: ListInquiryComponent;
  let fixture: ComponentFixture<ListInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListInquiryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
