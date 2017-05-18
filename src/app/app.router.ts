import { Route } from '@angular/router';
import { Chapter01Component } from './chapter-01/chapter-01.component';
import { Chapter02Component } from './chapter-02/chapter-02.component';

export const routes: Route[] = [
  { path: '', redirectTo: 'chapter-01', pathMatch: 'full' },
  { path: 'chapter-01', component: Chapter01Component },
  { path: 'chapter-02', component: Chapter02Component },
];
