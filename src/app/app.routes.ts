import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './ui/search/search.component';
import { FavoritesComponent } from './ui/favorites/favorites.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'search',
        component: SearchComponent,
        title: 'Search Movies',
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        title: 'Your Favorite Movies',
      },
    ],
  },
];
