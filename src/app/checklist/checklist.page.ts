import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject, combineLatest, filter, map, switchMap } from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { Checklist } from '../shared/interfaces/checklist';
import { FormModalComponent } from '../shared/ui/form-modal/form-modal.component';
import { ChecklistItemService } from './data-access/checklist-item.service';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [CommonModule, IonicModule, FormModalComponent],
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistPage {
  checklistAndItems$ = this.route.paramMap.pipe(
    switchMap((params) =>
      combineLatest([
        this.checklistService
          .getChecklistById(params.get('id') as string)
          .pipe(filter((checklist): checklist is Checklist => !!checklist)),
        this.checklistItemService.getItemsByChecklistId(
          params.get('id') as string
        ),
      ])
    )
  );

  formModalIsOpen$ = new BehaviorSubject<boolean>(false);

  vm$ = combineLatest([this.checklistAndItems$, this.formModalIsOpen$]).pipe(
    map(([[checklist, items], formModalIsOpen]) => ({
      checklist,
      items,
      formModalIsOpen,
    }))
  );

  checklistItemForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private checklistService: ChecklistService,
    private checklistItemService: ChecklistItemService
  ) {}

  addChecklistItem(checklistId: string) {
    this.checklistItemService.add(
      this.checklistItemForm.getRawValue(),
      checklistId
    );
  }
}
