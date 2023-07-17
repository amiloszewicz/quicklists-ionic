import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonRouterOutlet, IonicModule } from '@ionic/angular';
import { BehaviorSubject, tap } from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { Checklist } from '../shared/interfaces/checklist';
import { FormModalComponent } from '../shared/ui/form-modal/form-modal.component';
import { ChecklistListComponent } from './ui/checklist-list/checklist-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    AsyncPipe,
    FormModalComponent,
    ChecklistListComponent,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  formModalIsOpen$ = new BehaviorSubject<boolean>(false);
  checklists$ = this.checklistService.getChecklists().pipe(
    tap(() => {
      setTimeout(() => {
        this.ionContent.scrollToBottom(200);
      }, 0);
    })
  );
  checklistIsBeingEdited$ = new BehaviorSubject<string | null>(null);
  @ViewChild(IonContent) ionContent!: IonContent;

  checklistForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
  });

  addChecklist() {
    this.checklistService.add(this.checklistForm.getRawValue());
  }

  deleteChecklist(id: string) {
    this.checklistService.remove(id);
  }

  editChecklist(checklistId: string) {
    this.checklistService.update(checklistId, this.checklistForm.getRawValue());
  }

  openEditModal(checklist: Checklist) {
    this.checklistForm.patchValue({
      title: checklist.title,
    });
    this.checklistIsBeingEdited$.next(checklist.id);
    this.formModalIsOpen$.next(true);
  }

  constructor(
    public routerOutlet: IonRouterOutlet,
    private fb: FormBuilder,
    private checklistService: ChecklistService
  ) {}
}
