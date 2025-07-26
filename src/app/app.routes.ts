import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'students',
    loadComponent: () => import('./students/students-overview').then(m => m.StudentsOverview)
  },
];
