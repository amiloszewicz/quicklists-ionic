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
      id: this.generateSlung(checklist.title),
    };

    this.checklists$.next([...this.checklists$.value, newChecklist]);
  }

  private generateSlung(title: string) {
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    const matchingSlugs = this.checklists$.value.find(
      (checklist) => checklist.id === slug
    );

    if (matchingSlugs) {
      slug = slug + Date.now().toString();
    }

    return slug;
  }

  constructor() {}
}