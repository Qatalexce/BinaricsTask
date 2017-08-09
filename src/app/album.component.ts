import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgClass } from '@angular/common';

import { ImageService } from './image.service';
import { Album } from'./models';
import { Picture } from'./models';

@Component({
    selector: 'album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
    constructor(private imageService: ImageService, private route: ActivatedRoute) {
        window.onscroll = () => {
            if (window.scrollY + window.innerHeight >= document.documentElement.offsetHeight - 150) {
                this.loadPics();
            }
        }
     }
    shownImage: Picture;
    isSelected = false;
    album: Picture[];
    currentPics: Picture[];
    ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
      this.imageService.getPictures(parseInt(params.get('id'))))
        .subscribe((album: Picture[]) => {
             this.album = album;
             this.currentPics = this.album.slice(0, 20);
            });
    }

    loadPics() {
        if (this.album == null)
            return;

        if (this.currentPics.length >= this.album.length ) {
            return;
        }
        this.currentPics = this.currentPics.concat(this.album.slice(this.currentPics.length, this.currentPics.length + 10));

    }

    showImage(pic: Picture) {
        if (this.isSelected)
            return;
        this.isSelected = true;
        this.shownImage = pic;
    }

    hideImage() {
        this.isSelected = false;
    }

}