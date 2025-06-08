import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalityModalComponent } from './modal/personality-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-personalities',
  templateUrl: './personalities.component.html',
  styleUrls: ['./personalities.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ]
})
export class PersonalitiesComponent {
  personalities: any[] = [];

  constructor(private dialog: MatDialog) {}

  openAddPersonalityModal() {
    const dialogRef = this.dialog.open(PersonalityModalComponent, {
      width: '400px',
      data: { type: 'add', title: 'Kişilik Tipi Ekle', personality: { name: '', description: '' } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.personality) {
        this.personalities.push({
          id: this.personalities.length + 1,
          ...result.personality
        });
      }
    });
  }

  editPersonality(personality: any) {
    const dialogRef = this.dialog.open(PersonalityModalComponent, {
      width: '400px',
      data: { type: 'edit', title: 'Kişilik Tipi Düzenle', personality: { ...personality } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.personality) {
        const index = this.personalities.findIndex(p => p.id === personality.id);
        if (index !== -1) {
          this.personalities[index] = { ...this.personalities[index], ...result.personality };
        }
      }
    });
  }

  deletePersonality(id: number) {
    this.personalities = this.personalities.filter(p => p.id !== id);
  }
} 