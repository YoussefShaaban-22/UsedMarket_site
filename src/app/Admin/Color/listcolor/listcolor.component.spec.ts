import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcolorComponent } from './listcolor.component';

describe('ListcolorComponent', () => {
  let component: ListcolorComponent;
  let fixture: ComponentFixture<ListcolorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListcolorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListcolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
