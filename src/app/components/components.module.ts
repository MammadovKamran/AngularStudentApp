import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPersonalitiesComponent } from './modal/modal-personalities/modal-personalities.component';
import { ModalSpecialitiesComponent } from './modal/modal-specialities/modal-specialities.component';
import { ModalSubjectsComponent } from './modal/modal-subjects/modal-subjects.component';
import { ModalBudgetComponent } from './modal/modal-budget/modal-budget.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalSpecialitiesComponent,
    ModalBudgetComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ModalSubjectsComponent
  ]
})
export class ComponentsModule { }
