import { Routes } from '@angular/router';
import { APP_DISPLAY_NAME } from './main/app-name';
import { DashboardComponent } from './main/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: DashboardComponent, title: APP_DISPLAY_NAME },
  // Each technology's study guide, loaded only when one is opened; it sets its own title.
  { path: 'technologies/:slug', loadComponent: () => import('./technologies/study-guide-page').then((m) => m.StudyGuidePageComponent) },
  { path: '**', redirectTo: '' },
];
