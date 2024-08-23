import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSellerComponent } from './create-seller.component';

describe('CreateSellerComponent', () => {
  let component: CreateSellerComponent;
  let fixture: ComponentFixture<CreateSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSellerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
