import { Routes } from '@angular/router';
import { HomeComponent } from './main-website/pages/home/home.component';
import { CmsHomeComponent } from './cms/pages/cms-home/cms-home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'me',
        component: CmsHomeComponent
    }
];
