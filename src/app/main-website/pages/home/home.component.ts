import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, signal, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CloudinaryModule } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { environment } from '../../../../environments/environment';
import { HomeService } from '../../services/home.service';
import { MyServiceComponent } from "../../components/my-service/my-service.component";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

register()

@Component({
    selector: 'home',
    imports: [CloudinaryModule, MyServiceComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements AfterViewInit {

    nav_bar_opened: boolean = false;

    all_works!: any[];
    images_ready_for_render = signal<CloudinaryImage[]>([]);

    @ViewChild('servicesHeading') service_text !: ElementRef
    @ViewChild('aboutsection') aboutsection !: ElementRef;
    @ViewChild('swipercontainer') swiper_container !: ElementRef
    swiper_params: SwiperOptions = {
        injectStylesUrls: ['/swiper-navigators.style.css'],
        navigation: false,
        pagination: {
            clickable: true
        },
        autoplay: {
            delay: 5000
        },
        a11y: {
            containerMessage: "My about me section as a slideshow, slide 2 holds the main textual content.",
            enabled: true,

        },
        init: true
    }

    constructor(private homeservice: HomeService, private cdr: ChangeDetectorRef, private zone: NgZone) {
        zone.runOutsideAngular(() => {
            gsap.registerPlugin(ScrollTrigger);
        })
    }

    async ngAfterViewInit(): Promise<void> {
        this.all_works = await this.homeservice.fetchWorks()

        const my_cloudinary = new Cloudinary({
            cloud: {
                cloudName: environment.cloudinary.cloud_name,
                apiKey: environment.cloudinary.api_key,
                apiSecret: environment.cloudinary.api_secret
            }
        })

        if (typeof this.all_works !== 'undefined')
            this.images_ready_for_render.set(
                this.all_works.map((arr) => {
                    const img = my_cloudinary.image(arr.public_id)

                    img.format('auto')

                    return img;
                }))

        Object.assign(this.swiper_container.nativeElement, this.swiper_params)

        // @ts-ignore
        this.swiper_container.nativeElement.initialize()
        this.zone.runOutsideAngular(async () => {
            if (this.service_text)
                gsap.fromTo(
                    this.service_text.nativeElement,
                    { xPercent: 100, opacity: 0 },
                    {
                        xPercent: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: this.aboutsection.nativeElement,
                            start: "bottom 20%",
                            end: "+=500 60%",
                            markers: false,
                            pin: false,
                            scrub: true
                        }
                    }
                )
        });
    }
}
