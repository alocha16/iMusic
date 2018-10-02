import {ModuleWithProviders } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {EditUserComponent} from './edit-user/edit-user.component';
import {ArtistListComponent} from './artist-list/artist-list.component';

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
        path: 'artists/:page?',
        component : ArtistListComponent
    },
    {
        path: '**',
        component : EditUserComponent
    }
];

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);