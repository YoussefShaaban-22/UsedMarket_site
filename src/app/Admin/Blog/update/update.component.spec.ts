import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBlogComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateBlogComponent;
  let fixture: ComponentFixture<UpdateBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
