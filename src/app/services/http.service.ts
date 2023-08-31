import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.BASE_URL}`
@Injectable(
  {providedIn:"root"}
)
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  private url(controller: string, action: string) {
    controller= controller==""?"api":""
    return API_URL+`/${controller}/${action}`;
  }

  get(controller: string, action: string, id?: number): Observable<any> {
    if (!id)
      return this.httpClient.get(this.url(controller, action));
    else
      return this.httpClient.get(`${this.url(controller, action)}/${id}`);
  }

  post(controller: string, action: string, body: any) {
    return this.httpClient.post(this.url(controller, action), body);
  }

  put(controller: string, action: string, body: any,id:number) {
    //return this.httpClient.put(this.url(controller, action), body);
    return this.httpClient.put(`${this.url(controller, action)}/${id}`,body);

  }

  delete(controller: string, action: string, id: number) {
    return this.httpClient.delete(`${this.url(controller, action)}/${id}`);
  }
}
