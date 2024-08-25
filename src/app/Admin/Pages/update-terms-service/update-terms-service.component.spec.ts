import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTermsServiceComponent } from './update-terms-service.component';

describe('UpdateTermsServiceComponent', () => {
  let component: UpdateTermsServiceComponent;
  let fixture: ComponentFixture<UpdateTermsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTermsServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTermsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
