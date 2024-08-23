import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsliderComponent } from './listslider.component';

describe('ListsliderComponent', () => {
  let component: ListsliderComponent;
  let fixture: ComponentFixture<ListsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
