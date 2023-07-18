import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Checklist } from 'src/app/shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-header',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './checklist-header.component.html',
  styleUrls: ['./checklist-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistHeaderComponent {
  @Input() checklist!: Checklist;
  @Output() reset = new EventEmitter<string>();
  @Output() openModal = new EventEmitter<boolean>();
}
