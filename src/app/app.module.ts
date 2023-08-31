import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './puantaj/auth/auth.module';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { ToastModule } from 'primeng/toast';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { HomeComponent } from './puantaj/home/home.component';






@NgModule({
    declarations: [
        AppComponent, NotFoundComponent,
        UnauthorizedComponent,
        HomeComponent,
     
        
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ToastModule,
        ReactiveFormsModule
        // AuthModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
         { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
