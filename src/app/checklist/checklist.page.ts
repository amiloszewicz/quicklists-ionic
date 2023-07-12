import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistPage {
  constructor() {}
}
