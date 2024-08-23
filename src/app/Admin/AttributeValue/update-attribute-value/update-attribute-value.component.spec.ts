import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAttributeValueComponent } from './update-attribute-value.component';

describe('UpdateAttributeValueComponent', () => {
  let component: UpdateAttributeValueComponent;
  let fixture: ComponentFixture<UpdateAttributeValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAttributeValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAttributeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
