import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentTakerRegisterComponent } from './assessment-taker-register.component';

describe('AssessmentTakerRegisterComponent', () => {
  let component: AssessmentTakerRegisterComponent;
  let fixture: ComponentFixture<AssessmentTakerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentTakerRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentTakerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
