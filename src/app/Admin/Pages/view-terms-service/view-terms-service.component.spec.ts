import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTermsServiceComponent } from './view-terms-service.component';

describe('ViewTermsServiceComponent', () => {
  let component: ViewTermsServiceComponent;
  let fixture: ComponentFixture<ViewTermsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTermsServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTermsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
