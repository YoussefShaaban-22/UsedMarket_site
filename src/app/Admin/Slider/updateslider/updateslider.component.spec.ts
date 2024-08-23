import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesliderComponent } from './updateslider.component';

describe('UpdatesliderComponent', () => {
  let component: UpdatesliderComponent;
  let fixture: ComponentFixture<UpdatesliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatesliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatesliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
