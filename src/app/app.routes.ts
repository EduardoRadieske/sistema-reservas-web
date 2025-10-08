import { Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { App } from './app';
import { Home } from './modules/home/home';

export const routes: Routes = [
    {
        path: '',
        component: App
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'home',
        component: Home
    }
];
