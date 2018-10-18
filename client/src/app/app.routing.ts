import {ModuleWithProviders } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {EditUserComponent} from './edit-user/edit-user.component';
import {ArtistListComponent} from './artist-list/artist-list.component';
import {HomeComponent} from './home/home.component';
import { ArtistAddComponent } from './artist-add/artist-add.component';

const appRoutes:Routes = [
    {
        path: '',
        component : HomeComponent
    },
    {
        path: 'home',
        component : HomeComponent
    },
    {
        path: 'mis-datos',
        component : EditUserComponent
    },
    {
        path: 'artists/:page',
        component : ArtistListComponent
    },
    {
        path: 'create_artist/:id?',
        component : ArtistAddComponent
    },
    {
        path: '**',
        component : HomeComponent
    }
];

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);