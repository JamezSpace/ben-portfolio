import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { v2 as cloudinary } from 'cloudinary';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    constructor(@Inject(PLATFORM_ID) private platformId: any) { }

    async fetchWorks(): Promise< any | undefined> {
        try {
            if (!isPlatformBrowser(this.platformId)) return 

            const response = await fetch(window.location.origin + '/api/static-images');
            const data = await response.json()

            return data
        } catch (error) {
            console.error(error);            
        }
    }
}
