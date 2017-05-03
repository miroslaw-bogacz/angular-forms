import { Route } from '@angular/router';
import { Chapter01Component } from './chapter-01/chapter-01.component';

export const routes: Route[] = [
  { path: '', redirectTo: 'chapter-01', pathMatch: 'full' },
  { path: 'chapter-01', component: Chapter01Component },
];
