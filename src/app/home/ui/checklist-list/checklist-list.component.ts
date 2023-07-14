import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Checklist } from 'src/app/shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistListComponent {
  @Input() checklists!: Checklist[];
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Checklist>();

  trackByFn(index: number, checklist: Checklist) {
    return checklist.id;
  }

  constructor() {}
}
