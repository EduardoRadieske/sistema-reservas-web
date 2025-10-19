import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Reservas } from './pages/reservas/reservas';
import { Configs } from './pages/configs/configs';

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
    },
    {
        path: 'reservas',
        component: Reservas
    },
    {
        path: 'config',
        component: Configs
    }
];
