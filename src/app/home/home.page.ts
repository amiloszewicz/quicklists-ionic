import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';
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
  checklists$ = this.checklistService.getChecklists();

  checklistForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
  });

  addChecklist() {
    this.checklistService.add(this.checklistForm.getRawValue());
  }

  deleteChecklist(id: string) {
    this.checklistService.remove(id);
  }

  constructor(
    private fb: FormBuilder,
    private checklistService: ChecklistService
  ) {}
}
