import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHomeSliderComponent } from './update-home-slider.component';

describe('UpdateHomeSliderComponent', () => {
  let component: UpdateHomeSliderComponent;
  let fixture: ComponentFixture<UpdateHomeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateHomeSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateHomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
