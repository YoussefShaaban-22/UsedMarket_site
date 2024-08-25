import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReturnsPolicyComponent } from './update-returns-policy.component';

describe('UpdateReturnsPolicyComponent', () => {
  let component: UpdateReturnsPolicyComponent;
  let fixture: ComponentFixture<UpdateReturnsPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateReturnsPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateReturnsPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
