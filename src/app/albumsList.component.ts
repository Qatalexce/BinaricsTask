import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ImageService } from './image.service';
import { Album } from'./models';
import { Picture } from'./models';

@Component({
    selector: 'albumsList',
    templateUrl: './albumsList.component.html',
    styleUrls: ['./albumsList.component.css']
})
export class AlbumsList implements OnInit
{
    constructor(private imageService: ImageService, private router: Router) {
        window.onscroll = () => {
            if (window.scrollY + window.innerHeight >= document.documentElement.offsetHeight - 150) {
                this.loadAlbums();
            }
        }
     }
    albumsCount: number = 40;
    albums: Album[];
    albumsData: Picture[][];
    ngOnInit() {
        this.imageService.getAlbums()
            .subscribe(response => {
            this.albums = response;
            this.albumsData = new Array<Array<Picture>>(this.albumsCount);
            for (let i = 0; i < this.albumsCount; ++i) {
                this.albumsData[i] = new Array<Picture>();
                this.imageService.getPictures(this.albums[i].id)
                    .subscribe(res => this.albumsData[i] = res);
            }
        });
    }

    loadAlbums() {
        if (this.albums == null) {
            return;
        }

        if (this.albumsCount >= this.albums.length)
            return;
        for (let i = this.albumsCount; i < this.albumsCount + 10; ++i) {
            this.albumsData[i] = new Array<Picture>();
            this.imageService.getPictures(this.albums[i].id)
                .subscribe(res => this.albumsData[i] = res);
        }
        this.albumsCount += 10;
    }

    albumSelected(index: number) {
        this.router.navigate(['/albums', this.albums[index].id])
    }

}