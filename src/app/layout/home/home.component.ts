import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalPersonalitiesComponent } from '../../components/modal/modal-personalities/modal-personalities.component';
import { ModalSpecialitiesComponent } from '../../components/modal/modal-specialities/modal-specialities.component';
import { ModalSubjectsComponent } from '../../components/modal/modal-subjects/modal-subjects.component';
import { ModalBudgetComponent } from '../../components/modal/modal-budget/modal-budget.component';
import { AuthService } from '../../services/model/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    public router: Router, 
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  public navigate(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openModal(type: string) {
    switch(type) {
      case 'personalities':
        this.dialog.open(ModalPersonalitiesComponent);
        break;
      case 'specialities':
        this.dialog.open(ModalSpecialitiesComponent);
        break;
      case 'exam-subjects':
        this.dialog.open(ModalSubjectsComponent);
        break;
      case 'budget':
        this.dialog.open(ModalBudgetComponent);
        break;
        
    }
  }
}
