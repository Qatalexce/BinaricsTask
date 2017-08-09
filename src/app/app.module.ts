import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AlbumsList } from './albumsList.component';
import { AlbumComponent } from './album.component';
import { ImageService } from './image.service';
@NgModule({
  declarations: [
    AppComponent, 
    AlbumsList,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'albums/:id', component: AlbumComponent},
      {path: 'albums', component: AlbumsList},
      {path: '', redirectTo: 'albums', pathMatch: 'full'},
      {path: '**', redirectTo: 'albums', pathMatch: 'full'}
    ])
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
