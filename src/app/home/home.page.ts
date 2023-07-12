import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { FormModalComponent } from '../shared/ui/form-modal/form-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, AsyncPipe, FormModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  formModalIsOpen$ = new BehaviorSubject<boolean>(false);

  checklistForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
  });

  addChecklist() {
    this.checklistService.add(this.checklistForm.getRawValue());
  }

  constructor(
    private fb: FormBuilder,
    private checklistService: ChecklistService
  ) {}
}
