import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { HomeComponent } from './home/home.component';
import { ArtistAddComponent } from './artist-add/artist-add.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    EditUserComponent,
    ArtistListComponent,
    HomeComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
