import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlogComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateBlogComponent;
  let fixture: ComponentFixture<CreateBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
