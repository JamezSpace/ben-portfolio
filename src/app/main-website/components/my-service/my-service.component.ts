import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-service',
  imports: [],
  templateUrl: './my-service.component.html',
  styleUrl: './my-service.component.css'
})
export class MyServiceComponent {
    @Input({required: true}) service_name: string = '';

    @Input({required: false}) image_url: string = 'myLogo.png';
}
