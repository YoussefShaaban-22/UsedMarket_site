import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHomeSliderComponent } from './create-home-slider.component';

describe('CreateHomeSliderComponent', () => {
  let component: CreateHomeSliderComponent;
  let fixture: ComponentFixture<CreateHomeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateHomeSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateHomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
