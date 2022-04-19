import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import { ClientLoginComponent } from "./components/client-login/client-login.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./components/home/home.component";
import {ClientDashboardComponent} from "./components/client-dashboard/client-dashboard.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {EditQuizComponent} from "./components/client-dashboard/edit-quiz/edit-quiz.component";
import {QuestionsListComponent} from "./components/client-dashboard/questions-list/questions-list.component";



const routes: Routes = [
  { path: 'clientLogin', component: ClientLoginComponent },
  {path: '', component: HomeComponent},
  {path: 'clientDashboard', component: ClientDashboardComponent },
  {path: 'registration', component: RegistrationComponent},
  {path: 'clientDashboard/questions', component: QuestionsListComponent},
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

