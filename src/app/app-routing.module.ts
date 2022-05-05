import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ClientLoginComponent } from "./components/client/client-login/client-login.component";
import {HomeComponent} from "./components/home/home.component";
import {ClientDashboardComponent} from "./components/client/client-dashboard/client-dashboard.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {QuestionsListComponent} from "./components/client/client-dashboard/questions-list/questions-list.component";
import {AssessmentTakerLoginComponent} from "./components/assessmentTaker/assessment-taker-login/assessment-taker-login.component";
import {AssessmentComponent} from "./components/assessment/assessment.component";
import {StartQuizComponent} from "./components/assessment/start-quiz/start-quiz.component";
import {
  AssessmentTakerRegisterComponent
} from "./components/assessmentTaker/assessment-taker-register/assessment-taker-register.component";
import {ClientRegisterComponent} from "./components/client/client-register/client-register.component";

const routes: Routes = [

  {path: '', component: HomeComponent},
  { path: 'clientLogin', component: ClientLoginComponent },
  { path: 'clientRegister', component: ClientRegisterComponent },
  {path: 'clientDashboard', component: ClientDashboardComponent },
  {path: 'clientDashboard/questions', component: QuestionsListComponent},
  {path: 'assessmentTakerLogin', component:AssessmentTakerLoginComponent},
  {path: 'assessment/:assessmentCode', component:AssessmentComponent, pathMatch:'full'},
  {path: 'start-quiz/:qid',component:StartQuizComponent,pathMatch:'full'},
  {path: 'assessmentTakerRegister',component:AssessmentTakerRegisterComponent},
  {path: 'assessmentTakerLogin',component:AssessmentTakerLoginComponent},



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

