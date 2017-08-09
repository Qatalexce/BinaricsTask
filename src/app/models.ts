export class Album
{
    userId: number;
    id: number;
    title: string;
}

export class Picture
{
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}