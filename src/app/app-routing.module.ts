import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ClientLoginComponent } from "./components/client/client-login/client-login.component";
import {HomeComponent} from "./components/home/home.component";
import {QuestionsListComponent} from "./components/client/dashboard/questions-list/questions-list.component";
import {AssessmentTakerLoginComponent} from "./components/assessmentTaker/assessment-taker-login/assessment-taker-login.component";
import {AssessmentComponent} from "./components/assessment/assessment.component";
import {StartQuizComponent} from "./components/assessment/start-quiz/start-quiz.component";
import {
  AssessmentTakerRegisterComponent
} from "./components/assessmentTaker/assessment-taker-register/assessment-taker-register.component";
import {ClientRegisterComponent} from "./components/client/client-register/client-register.component";
import {DashboardComponent} from "./components/client/dashboard/dashboard.component";
import {
  AssessmentsListComponent
} from "./components/client/dashboard/assessments-list/assessments-list.component";
import {CandidatesListComponent} from "./components/client/dashboard/candidates-list/candidates-list.component";
import {QuizzesListComponent} from "./components/client/dashboard/quizzes-list/quizzes-list.component";
import {SessionsListComponent} from "./components/client/dashboard/sessions-list/sessions-list.component";
import {MailSuccessComponent} from "./components/mail-success/mail-success.component";
import {TokenComponent} from "./components/token/token.component";

const routes: Routes = [

  {path: '', component: HomeComponent},
  { path: 'clientLogin', component: ClientLoginComponent },
  { path: 'clientRegister', component: ClientRegisterComponent },
  {path: 'assessmentTakerLogin', component:AssessmentTakerLoginComponent},
  {path: 'assessment/:assessmentCode', component:AssessmentComponent, pathMatch:'full'},
  {path: 'start-quiz/:qid',component:StartQuizComponent,pathMatch:'full'},
  {path: 'assessmentTakerRegister',component:AssessmentTakerRegisterComponent},
  {path: 'assessmentTakerLogin',component:AssessmentTakerLoginComponent},
  {path: 'mail-success',component:MailSuccessComponent},
  { path: 'verify', component: TokenComponent },



  {path: 'dashboard', component:DashboardComponent,
    children:[
      {path:'',component:AssessmentsListComponent},
      {path:'assessments',component:AssessmentsListComponent},
      {path:'candidates',component:CandidatesListComponent,},
      {path:'quizzes',component:QuizzesListComponent,},
      {path:'questions',component:QuestionsListComponent,},
      {path:'sessions',component:SessionsListComponent,},
    ]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule {

}

