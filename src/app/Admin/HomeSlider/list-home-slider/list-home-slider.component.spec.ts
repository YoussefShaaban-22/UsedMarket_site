import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHomeSliderComponent } from './list-home-slider.component';

describe('ListHomeSliderComponent', () => {
  let component: ListHomeSliderComponent;
  let fixture: ComponentFixture<ListHomeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListHomeSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListHomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
