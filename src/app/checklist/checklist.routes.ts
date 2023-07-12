import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./checklist.page').then((m) => m.ChecklistPage),
  },
];
