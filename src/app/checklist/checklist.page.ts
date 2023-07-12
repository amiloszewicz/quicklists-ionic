import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { switchMap } from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistPage {
  checklist$ = this.route.paramMap.pipe(
    switchMap((paramMap) =>
      this.checklistService.getChecklistById(paramMap.get('id') as string)
    )
  );

  constructor(
    private route: ActivatedRoute,
    private checklistService: ChecklistService
  ) {}
}
