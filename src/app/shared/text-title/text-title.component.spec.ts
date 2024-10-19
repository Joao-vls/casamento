import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTitleComponent } from './text-title.component';

describe('TextTitleComponent', () => {
  let component: TextTitleComponent;
  let fixture: ComponentFixture<TextTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
