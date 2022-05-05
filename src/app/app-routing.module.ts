import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ClientLoginComponent } from "./components/client/client-login/client-login.component";
import {HomeComponent} from "./components/home/home.component";
import {ClientDashboardComponent} from "./components/client/client-dashboard/client-dashboard.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {QuestionsListComponent} from "./components/client/client-dashboard/questions-list/questions-list.component";
import {AssessmentTakerLoginComponent} from "./components/assessment-taker-login/assessment-taker-login.component";
import {AssessmentComponent} from "./components/assessment/assessment.component";
import {StartQuizComponent} from "./components/assessment/start-quiz/start-quiz.component";

const routes: Routes = [
  { path: 'clientLogin', component: ClientLoginComponent },
  {path: '', component: HomeComponent},
  {path: 'clientDashboard', component: ClientDashboardComponent },
  {path: 'registration', component: RegistrationComponent},
  {path: 'clientDashboard/questions', component: QuestionsListComponent},
  {path: 'assessmentTakerLogin', component:AssessmentTakerLoginComponent},
  {path: 'assessment/:assessmentCode', component:AssessmentComponent, pathMatch:'full'},
  {path:'start-quiz/:qid',component:StartQuizComponent,pathMatch:'full'},


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

