import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReturnsPolicyComponent } from './view-returns-policy.component';

describe('ViewReturnsPolicyComponent', () => {
  let component: ViewReturnsPolicyComponent;
  let fixture: ComponentFixture<ViewReturnsPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewReturnsPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewReturnsPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
