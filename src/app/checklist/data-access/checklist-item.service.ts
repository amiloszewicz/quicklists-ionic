import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { StorageService } from 'src/app/shared/data-access/storage.service';
import {
  AddChecklistItem,
  ChecklistItem,
} from 'src/app/shared/interfaces/chhcecklist-item';

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemService {
  private checklistItems$ = new BehaviorSubject<ChecklistItem[]>([]);

  getItemsByChecklistId(checklistId: string) {
    return this.checklistItems$.pipe(
      map((items) => items.filter((item) => item.checklistId === checklistId)),
      tap(() =>
        this.storageService.saveChecklistItems(this.checklistItems$.value)
      )
    );
  }

  add(item: AddChecklistItem, checklistId: string) {
    const newItem = {
      id: Date.now().toString(),
      checklistId,
      checked: false,
      ...item,
    };

    this.checklistItems$.next([...this.checklistItems$.value, newItem]);
  }

  toggle(itemId: string) {
    const newItems = this.checklistItems$.value.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );

    this.checklistItems$.next(newItems);
  }

  reset(checklistId: string) {
    const newItems = this.checklistItems$.value.map((item) =>
      item.checklistId === checklistId ? { ...item, checked: false } : item
    );

    this.checklistItems$.next(newItems);
  }

  load() {
    this.storageService.loadChecklistItems$
      .pipe(take(1))
      .subscribe((checklistsItems) => {
        this.checklistItems$.next(checklistsItems);
      });
  }

  update(id: string, editedItem: AddChecklistItem) {
    const newItems = this.checklistItems$.value.map((item) =>
      item.id === id ? { ...item, title: editedItem.title } : item
    );

    this.checklistItems$.next(newItems);
  }

  remove(id: string) {
    const modifiedItems = this.checklistItems$.value.filter(
      (item) => item.id !== id
    );

    this.checklistItems$.next(modifiedItems);
  }

  removeAllItemsForChecklist(checklistId: string) {
    const modifiedItems = this.checklistItems$.value.filter(
      (item) => item.checklistId !== checklistId
    );

    this.checklistItems$.next(modifiedItems);
  }

  constructor(private storageService: StorageService) {}
}
