import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';    
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-admin-personalities',
  templateUrl: './personalities.component.html',
  styleUrls: ['./personalities.component.scss'],
  standalone:true,
  imports:[CommonModule,MatDialogModule,MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatIconModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatCardModule]
})
export class PersonalitiesComponent {
  personalities = [
    { id: 1, name: 'Analytical', description: 'Logical and detail-oriented.' },
    { id: 2, name: 'Amiable', description: 'Friendly and supportive.' },
    { id: 3, name: 'Driver', description: 'Results-oriented and decisive.' }
  ];

  constructor(private dialog: MatDialog) { }

  openAddPersonalityModal() {
    // Modal açma işlemi (PersonalityModalComponent ile)
  }

  editPersonality(personality: any) {
    // Modal açma işlemi (PersonalityModalComponent ile)
  }

  deletePersonality(id: number) {
    this.personalities = this.personalities.filter(p => p.id !== id);
  }
} 