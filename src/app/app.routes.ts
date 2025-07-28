import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  },
  {
    path: 'students',
    loadComponent: () => import('./students/students-overview').then(m => m.StudentsOverview)
  },
];
