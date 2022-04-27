import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentEntryComponent } from './assessment-entry.component';

describe('AssessmentEntryComponent', () => {
  let component: AssessmentEntryComponent;
  let fixture: ComponentFixture<AssessmentEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
