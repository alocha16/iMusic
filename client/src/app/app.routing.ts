import {ModuleWithProviders } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {EditUserComponent} from './edit-user/edit-user.component';

const appRoutes:Routes = [
    {
        path: '',
        component : EditUserComponent
    },
    {
        path: 'mis-datos',
        component : EditUserComponent
    },
    {
        path: '**',
        component : EditUserComponent
    }

];

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);