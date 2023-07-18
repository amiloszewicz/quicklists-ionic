import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonList, IonicModule, ItemReorderEventDetail } from '@ionic/angular';
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
  @Output() status = new EventEmitter<Checklist>();
  @ViewChild(IonList) checklistList!: IonList;

  async closeItems() {
    await this.checklistList.closeSlidingItems();
  }

  trackByFn(index: number, checklist: Checklist) {
    return checklist.id;
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  constructor() {}
}
