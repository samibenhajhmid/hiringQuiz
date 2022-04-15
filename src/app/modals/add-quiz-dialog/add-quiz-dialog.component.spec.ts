import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizDialogComponent } from './add-quiz-dialog.component';

describe('AddQuizDialogComponent', () => {
  let component: AddQuizDialogComponent;
  let fixture: ComponentFixture<AddQuizDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuizDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
