import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { Album } from './models'
import { Picture } from './models';

@Injectable()
export class ImageService
{
    readonly baseUrl = "https://jsonplaceholder.typicode.com"

    constructor(private http: Http) { }


    public getAlbums(): Observable<Album[]> {
        return this.http
        .get(`${this.baseUrl}/albums`)
        .map(response => JSON.parse(response.text()) as Album[])
    }

    public getPictures(albumId: number): Observable<Picture[]> {

        return this.http
        .get(`${this.baseUrl}/photos?albumId=${albumId}`)
        .map(response => JSON.parse(response.text()) as Picture[]);
    }

    public getPicture(photoId: number): Observable<Picture> {
        return this.http.get(`${this.baseUrl}/photos/${photoId}`)
        .map(response => JSON.parse(response.text()) as Picture);
    }

}