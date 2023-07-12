import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then((m) => m.routes),
  },
  {
    path: 'checklist/:id',
    loadChildren: () =>
      import('./checklist/checklist.routes').then((m) => m.routes),
  },
];
