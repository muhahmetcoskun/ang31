import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, firstValueFrom, Observable } from 'rxjs';
import { TatilGun } from 'src/app/models/tatilgun';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BasetanimlamalarserviceService {

  constructor(private httpService: HttpService, private http: HttpClient) { }


  get(appString: string): Observable<any> {
    return this.httpService.get("", appString, null);
  }
  kaydet(appString: string,tatilgun: any): Observable<any> {
    return this.httpService.post("", appString,  tatilgun);
  }
  guncelle(appString: string,tatilgun: any): Observable<any> {
    return this.httpService.put("", appString,  tatilgun,tatilgun.id);
  }
  sil(appString: string,id ): Observable<any> {
    return this.httpService.delete("",appString, id);
  }
}
