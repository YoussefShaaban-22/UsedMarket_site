import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlogCategoryComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateBlogCategoryComponent;
  let fixture: ComponentFixture<CreateBlogCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBlogCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBlogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
