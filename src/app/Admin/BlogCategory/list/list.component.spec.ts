import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBlogCategoryComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListBlogCategoryComponent;
  let fixture: ComponentFixture<ListBlogCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBlogCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBlogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
