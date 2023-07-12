import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Checklist } from 'src/app/shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistListComponent {
  @Input() checklists!: Checklist[];

  trackByFn(index: number, checklist: Checklist) {
    return checklist.id;
  }

  constructor() {}
}
