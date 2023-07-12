import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Checklist } from '../interfaces/checklist';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private checklists$ = new BehaviorSubject<Checklist[]>([]);

  getChecklists() {
    return this.checklists$.asObservable();
  }

  add(checklist: Pick<Checklist, 'title'>) {
    const newChecklist = {
      ...checklist,
      id: Date.now().toString(),
    };

    this.checklists$.next([...this.checklists$.value, newChecklist]);
  }

  constructor() {}
}
