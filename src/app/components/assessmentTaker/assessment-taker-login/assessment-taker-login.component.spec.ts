import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentTakerLoginComponent } from './assessment-taker-login.component';

describe('AssessmentTakerLoginComponent', () => {
  let component: AssessmentTakerLoginComponent;
  let fixture: ComponentFixture<AssessmentTakerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentTakerLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentTakerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
