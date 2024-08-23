import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseWayPaidComponent } from './choose-way-paid.component';

describe('ChooseWayPaidComponent', () => {
  let component: ChooseWayPaidComponent;
  let fixture: ComponentFixture<ChooseWayPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseWayPaidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseWayPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
