import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './puantaj/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { HomeComponent } from './puantaj/home/home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,  canActivate: [AuthGuard],
                children: [
                   
                    {   path: '', component: HomeComponent,  canActivate: [AuthGuard]},
                  
                ]
            },
            {
                path: '', component: AppLayoutComponent,  canActivate: [AuthGuard],
                children: [
                   
                    { path: 'tanimlamalar', loadChildren: () => import('./puantaj/tanimlamalar/tanimlamalar.module').then(m => m.TanimlamalarModule),  canActivate: [AuthGuard], },
                  
                ]
            },
            {
                path: 'auth',
                children: [
                    { path: '', loadChildren: () => import('./puantaj/auth/auth.module').then(m => m.AuthModule), },
                ]
            },
            {path: '404', component: NotFoundComponent},
            {path: '401', component: UnauthorizedComponent},
            {path: '**', component: NotFoundComponent},
           
            

            //{ path: 'auth', loadChildren: () => import('./puantaj/auth/auth.module').then(m => m.AuthModule) },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
