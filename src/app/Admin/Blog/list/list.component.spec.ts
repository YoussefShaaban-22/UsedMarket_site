import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBlogComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListBlogComponent;
  let fixture: ComponentFixture<ListBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
