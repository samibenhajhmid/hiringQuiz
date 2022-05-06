import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsListComponent } from './assessments-list.component';

describe('AssessmentListComponent', () => {
  let component: AssessmentsListComponent;
  let fixture: ComponentFixture<AssessmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
