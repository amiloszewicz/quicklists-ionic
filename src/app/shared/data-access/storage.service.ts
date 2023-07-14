import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, map, shareReplay, switchMap, tap } from 'rxjs';
import { Checklist } from '../interfaces/checklist';
import { ChecklistItem } from '../interfaces/chhcecklist-item';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  #checklistHasLoaded = false;
  #checklistItemsHasLoaded = false;

  private storage$ = from(this.ionicStorage.create()).pipe(shareReplay(1));

  loadChecklist$: Observable<Checklist[]> = this.storage$.pipe(
    switchMap((storage) => from(storage.get('checklists'))),
    map((checklists) => checklists ?? []),
    tap(() => (this.#checklistHasLoaded = true)),
    shareReplay(1)
  );

  loadChecklistItems$: Observable<ChecklistItem[]> = this.storage$.pipe(
    switchMap((storage) => from(storage.get('checklistsItems'))),
    map((checklistsItems) => checklistsItems ?? []),
    tap(() => (this.#checklistItemsHasLoaded = true)),
    shareReplay(1)
  );

  constructor(private ionicStorage: Storage) {}
}
