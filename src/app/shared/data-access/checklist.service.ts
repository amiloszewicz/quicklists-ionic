import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  shareReplay,
  take,
  tap,
} from 'rxjs';
import { Checklist } from '../interfaces/checklist';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private checklists$ = new BehaviorSubject<Checklist[]>([]);

  private sharedChecklists$: Observable<Checklist[]> = this.checklists$.pipe(
    tap((checklists) => this.storageService.saveChecklist(checklists)),
    shareReplay(1)
  );

  getChecklists() {
    return this.sharedChecklists$;
  }

  add(checklist: Pick<Checklist, 'title'>) {
    const newChecklist = {
      ...checklist,
      id: this.generateSlung(checklist.title),
    };

    this.checklists$.next([...this.checklists$.value, newChecklist]);
  }

  getChecklistById(id: string) {
    return this.getChecklists().pipe(
      filter((checklists) => checklists.length > 0),
      map((checklists) => checklists.find((checklist) => checklist.id === id))
    );
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

  load() {
    this.storageService.loadChecklist$.pipe(take(1)).subscribe((checklists) => {
      this.checklists$.next(checklists);
    });
  }

  remove(id: string) {
    const modifiedChecklists = this.checklists$.value.filter(
      (checklist) => checklist.id !== id
    );

    this.checklists$.next(modifiedChecklists);
  }

  update(id: string, editedData: Checklist) {}

  constructor(private storageService: StorageService) {}
}
