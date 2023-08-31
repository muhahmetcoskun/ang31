import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private _auth: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this._auth.currentUserValue;
        const isLoggedIn = user && user.accessToken;
        const isApiUrl = request.url.startsWith(environment.BASE_URL);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `bearer ${user.accessToken}`
                }
            })
        }

        return next.handle(request)
    }
}