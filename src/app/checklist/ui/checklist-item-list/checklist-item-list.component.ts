import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChecklistItem } from 'src/app/shared/interfaces/chhcecklist-item';

@Component({
  selector: 'app-checklist-item-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './checklist-item-list.component.html',
  styleUrls: ['./checklist-item-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistItemListComponent {
  @Input() checklistItems!: ChecklistItem[];
  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<ChecklistItem>();

  trackByFn(index: number, item: ChecklistItem) {
    return item.id;
  }
}
