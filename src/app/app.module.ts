import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import {HttpClientModule} from "@angular/common/http";
import { AssessmentTakerLoginComponent } from './components/assessment-taker-login/assessment-taker-login.component';

import { HomeComponent } from './components/home/home.component';

import { BlogComponent } from './components/blog/blog.component';

import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";

import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import { MatRadioModule} from "@angular/material/radio";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {QuizService} from "./shared/services/quiz.service";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ConfirmDeleteComponent} from "./modals/confirm-delete/confirm-delete.component";
import { MatDialogModule} from '@angular/material/dialog';
import { AddQuizDialogComponent } from './modals/add-quiz-dialog/add-quiz-dialog.component';
import {MatNativeDateModule} from "@angular/material/core";
import { QuestionsListComponent } from './components/client-dashboard/questions-list/questions-list.component';
import { AddQuestionDialogComponent } from './modals/add-question-dialog/add-question-dialog.component';
import { AddCandidateDialogComponent } from './modals/add-candidate-dialog/add-candidate-dialog.component';
import { AddAnswerDialogComponent } from './modals/add-answer-dialog/add-answer-dialog.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { AddAssessmentDialogComponent } from './modals/add-assessment-dialog/add-assessment-dialog.component'
import {AssessmentsListComponent} from "./components/client-dashboard/assessments-list/assessments-list.component";
import {MatDividerModule} from "@angular/material/divider";
import { StartQuizComponent } from './components/assessment/start-quiz/start-quiz.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SessionsListComponent } from './components/client-dashboard/sessions-list/sessions-list.component';
import { CandidatesListComponent } from './components/client-dashboard/candidates-list/candidates-list.component';
import { QuizzesListComponent } from './components/client-dashboard/quizzes-list/quizzes-list.component';
import { AnswersListComponent } from './modals/answers-list/answers-list.component';
@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    FooterComponent,
    AboutComponent,
    ClientLoginComponent,
    AssessmentTakerLoginComponent,
    HomeComponent,
    BlogComponent,
    RegistrationComponent,
    ClientDashboardComponent,
    ConfirmDeleteComponent,
    AddQuizDialogComponent,
    QuestionsListComponent,
    AddQuestionDialogComponent,
    AddCandidateDialogComponent,
    AddAnswerDialogComponent,
    AssessmentComponent,
    AssessmentsListComponent,
    AddAssessmentDialogComponent,
    StartQuizComponent,
    SessionsListComponent,
    CandidatesListComponent,
    QuizzesListComponent,
    AnswersListComponent,


  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        NgbModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatGridListModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatDialogModule,
        MatNativeDateModule,
        MatDividerModule,
        MatProgressSpinnerModule,



    ],
  providers: [QuizService],
  exports: [],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmDeleteComponent]
})
export class AppModule { }
