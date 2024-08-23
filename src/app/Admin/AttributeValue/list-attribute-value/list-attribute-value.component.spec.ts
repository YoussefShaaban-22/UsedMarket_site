import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttributeValueComponent } from './list-attribute-value.component';

describe('ListAttributeValueComponent', () => {
  let component: ListAttributeValueComponent;
  let fixture: ComponentFixture<ListAttributeValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAttributeValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAttributeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
