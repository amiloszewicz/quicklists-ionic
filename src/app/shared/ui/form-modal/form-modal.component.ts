import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormModalComponent {
  @Input() title!: string;
  @Input() formGroup!: FormGroup;

  @Output() save = new EventEmitter<boolean>();

  constructor(private modalCtrl: ModalController) {}

  handleSave() {
    this.save.emit(true);
    this.dismiss();
  }

  dismiss() {
    this.formGroup.reset();
    this.modalCtrl.dismiss();
  }
}
