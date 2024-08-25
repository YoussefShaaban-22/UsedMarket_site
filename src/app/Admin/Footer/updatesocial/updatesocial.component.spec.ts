import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesocialComponent } from './updatesocial.component';

describe('UpdatesocialComponent', () => {
  let component: UpdatesocialComponent;
  let fixture: ComponentFixture<UpdatesocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatesocialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatesocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
