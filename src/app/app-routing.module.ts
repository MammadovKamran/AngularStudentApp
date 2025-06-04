import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { StudentsComponent } from './layout/admin-layout/pages/students/students.component';
import { PersonalitiesComponent } from './layout/admin-layout/pages/personalities/personalities.component';
import { SpecialitiesComponent } from './layout/admin-layout/pages/specialities/specialities.component';
import { SubjectsComponent } from './layout/admin-layout/pages/subjects/subjects.component';
import { ExamsComponent } from './layout/admin-layout/pages/exams/exams.component';
import { UniversitiesComponent } from './layout/admin-layout/pages/universities/universities.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {path: "login", component: LoginComponent},
      {path: "register", component: RegisterComponent},
      {path: "home", component: HomeComponent}
    ]
  },
  
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "students",
        component: StudentsComponent
      },
      {
        path: "personalities",
        component: PersonalitiesComponent
      },
      {
        path: "specialities",
        component: SpecialitiesComponent
      },
      {
        path: "subjects",
        component: SubjectsComponent
      },
      {
        path: "exams",
        component: ExamsComponent
      },
      {
        path: "universities",
        component: UniversitiesComponent
      },
      { path: "", redirectTo: "students", pathMatch: "full" }
    ]
  },

  {path: "**" , redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
