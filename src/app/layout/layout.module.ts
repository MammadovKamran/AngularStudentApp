import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpinnerComponent } from './spinner/spinner/spinner.component';
import { LoginModule } from './login/login.module';
import { NavbarComponent } from '../components/sidebar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { StudentsComponent } from './admin-layout/pages/students/students.component';
import { PersonalitiesComponent } from './admin-layout/pages/personalities/personalities.component';
import { SpecialitiesComponent } from './admin-layout/pages/specialities/specialities.component';
import { SubjectsComponent } from './admin-layout/pages/subjects/subjects.component';
import { ExamsComponent } from './admin-layout/pages/exams/exams.component';
import { UniversitiesComponent } from './admin-layout/pages/universities/universities.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    SpinnerComponent,
    NavbarComponent,
    AdminLayoutComponent,
    SpecialitiesComponent,
    SubjectsComponent,
    ExamsComponent,
    UniversitiesComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    RegisterComponent,
    RouterModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    LayoutComponent,
    SpinnerComponent,
    NavbarComponent,
    AdminLayoutComponent,
    SpecialitiesComponent,
    SubjectsComponent,
    ExamsComponent,
    UniversitiesComponent
  ]
})
export class LayoutModule { }
