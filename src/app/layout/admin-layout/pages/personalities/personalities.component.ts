import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalityModalComponent } from './modal/personality-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { PersonalitiesService } from '../../../../services/model/personalities.service';

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

  constructor(private dialog: MatDialog, private personalitiesService: PersonalitiesService) {}
  ngOnInit(): void {
    this.getPersonalities();
  }
  getPersonalities() {
    this.personalitiesService.getPersonalities().subscribe(data => {
      this.personalities = data;
    });
  } 
  openAddPersonalityModal() {
    const dialogRef = this.dialog.open(PersonalityModalComponent, {
      width: '400px',
      data: { type: 'add', title: 'Şəxsiyyət Tipi əlavə et', personality: { name: '', description: '' } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.personality) {
        this.personalitiesService.savePersonality(result.personality).subscribe(data => {
          this.personalities.push(data);
        });
      }
    });
  }

  editPersonality(personality: any) {
    const dialogRef = this.dialog.open(PersonalityModalComponent, {
      width: '400px',
      data: { type: 'edit', title: 'Şəxsiyyət Tipi Redaktə et', personality: { ...personality } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.personality) { 
        this.personalitiesService.updatePersonality(personality.id, result.personality).subscribe(data => {
          const index = this.personalities.findIndex(p => p.id === personality.id);
          if (index !== -1) {
            this.personalities[index] = data;
          }
        });
      }
    });
  }

  deletePersonality(id: number) {
    this.personalitiesService.deletePersonality(id).subscribe(() => {
      this.personalities = this.personalities.filter(p => p.id !== id);
    });
  }
} 