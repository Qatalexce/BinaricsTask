import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Album } from'./models';
import { Picture } from'./models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private imageService: ImageService, private router: Router) { }
  title = "";
  showButton: boolean
  ngOnInit() {
    if (this.router.url.includes('/albums/')) {
      this.showButton = true;
    }
    else{
      this.showButton = false;
    }


    this.router.events
    .filter(e => e instanceof NavigationEnd)
    .subscribe( (e: NavigationEnd) => {
        if(e.urlAfterRedirects === '/albums') {
          this.title = 'All albums';
          this.showButton = false;
        }
        else {
          this.showButton = true;
          this.imageService.getAlbums()
          .subscribe(albums => {
            let id = parseInt(e.urlAfterRedirects.substr( e.urlAfterRedirects.lastIndexOf('/') + 1));
            let album = albums.find(a => a.id == id);
            this.title = album.title;
          })
        }

          
    });
  }

}
