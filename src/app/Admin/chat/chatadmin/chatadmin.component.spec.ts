import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatadminComponent } from './chatadmin.component';

describe('ChatadminComponent', () => {
  let component: ChatadminComponent;
  let fixture: ComponentFixture<ChatadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
