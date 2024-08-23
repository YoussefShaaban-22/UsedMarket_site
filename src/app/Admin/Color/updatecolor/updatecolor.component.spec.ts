import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecolorComponent } from './updatecolor.component';

describe('UpdatecolorComponent', () => {
  let component: UpdatecolorComponent;
  let fixture: ComponentFixture<UpdatecolorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatecolorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatecolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
