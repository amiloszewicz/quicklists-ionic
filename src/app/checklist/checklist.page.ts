import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonRouterOutlet, IonicModule } from '@ionic/angular';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { Checklist } from '../shared/interfaces/checklist';
import { ChecklistItem } from '../shared/interfaces/chhcecklist-item';
import { FormModalComponent } from '../shared/ui/form-modal/form-modal.component';
import { ChecklistItemService } from './data-access/checklist-item.service';
import { ChecklistItemListComponent } from './ui/checklist-item-list/checklist-item-list.component';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormModalComponent,
    ChecklistItemListComponent,
  ],
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistPage {
  @ViewChild(IonContent) ionContent!: IonContent;
  checklistAndItems$ = this.route.paramMap.pipe(
    switchMap((params) =>
      combineLatest([
        this.checklistService
          .getChecklistById(params.get('id') as string)
          .pipe(filter((checklist): checklist is Checklist => !!checklist)),
        this.checklistItemService
          .getItemsByChecklistId(params.get('id') as string)
          .pipe(
            tap(() => setTimeout(() => this.ionContent.scrollToBottom(200), 0))
          ),
      ])
    )
  );

  formModalIsOpen$ = new BehaviorSubject<boolean>(false);
  checklistItemIsBeingEdited$ = new BehaviorSubject<string | null>(null);

  vm$ = combineLatest([
    this.checklistAndItems$,
    this.formModalIsOpen$,
    this.checklistItemIsBeingEdited$,
  ]).pipe(
    map(
      ([[checklist, items], formModalIsOpen, checklistItemIsBeingEdited]) => ({
        checklist,
        items,
        formModalIsOpen,
        checklistItemIsBeingEdited,
      })
    )
  );

  checklistItemForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
  });

  constructor(
    public routerOutlet: IonRouterOutlet,
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

  toggleChecklistItem(itemId: string) {
    this.checklistItemService.toggle(itemId);
  }

  resetChecklistItems(checklistId: string) {
    this.checklistItemService.reset(checklistId);
  }

  deleteChecklistItem(id: string) {
    this.checklistItemService.remove(id);
  }

  editChecklistItem(checklistItemId: string) {
    this.checklistItemService.update(
      checklistItemId,
      this.checklistItemForm.getRawValue()
    );
  }

  openEditModal(checklistItem: ChecklistItem) {
    this.checklistItemForm.patchValue({
      title: checklistItem.title,
    });
    this.checklistItemIsBeingEdited$.next(checklistItem.id);
    this.formModalIsOpen$.next(true);
  }
}
