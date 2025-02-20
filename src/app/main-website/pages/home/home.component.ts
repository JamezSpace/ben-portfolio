import { AfterViewInit, ChangeDetectorRef, Component, signal } from '@angular/core';
import { CloudinaryModule} from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { environment } from '../../../../environments/environment';
import { HomeService } from '../../services/home.service';


@Component({
    selector: 'home',
    imports: [CloudinaryModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
    nav_bar_opened: boolean = false;

    all_works!: any[];
    images_ready_for_render = signal<CloudinaryImage[]>([]);

    constructor(private homeservice: HomeService, private cdr: ChangeDetectorRef) { }

    async ngAfterViewInit(): Promise<void> {
        this.all_works = await this.homeservice.fetchWorks()

        const my_cloudinary = new Cloudinary({
            cloud: {
                cloudName: environment.cloudinary.cloud_name,
                apiKey: environment.cloudinary.api_key,
                apiSecret: environment.cloudinary.api_secret
            }
        })

        if(typeof this.all_works !== 'undefined') 
            this.images_ready_for_render.set(
                this.all_works.map((arr) => {
                const img = my_cloudinary.image(arr.public_id)
                            
                img.format('auto')

                return img;
            }))
    }
}
