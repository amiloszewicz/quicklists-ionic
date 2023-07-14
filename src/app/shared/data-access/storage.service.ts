import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage$ = from(this.ionicStorage.create()).pipe(shareReplay(1));

  constructor(private ionicStorage: Storage) {}
}
