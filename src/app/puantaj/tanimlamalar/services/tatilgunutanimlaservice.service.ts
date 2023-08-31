import { Injectable } from '@angular/core';
import { catchError, first, firstValueFrom, Observable } from 'rxjs';
import { TatilGun } from 'src/app/models/tatilgun';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";

const API_URL = `${environment.BASE_URL}/api/ResmiTatils`;
@Injectable({
  providedIn: 'root'
})
export class TatilgunutanimlaserviceService {

  constructor(private httpService: HttpService, private http: HttpClient) { }


  getTatilGunleri(): Observable<any> {
    return this.httpService.get("", "ResmiTatils", null);
  }

  kaydet(tatilgun: TatilGun): Observable<any> {
    return this.httpService.post("", "ResmiTatils",  tatilgun);
  }
  guncelle(tatilgun: TatilGun): Observable<any> {
    return this.httpService.put("", "ResmiTatils",  tatilgun,tatilgun.id);
  }
  sil(id ): Observable<any> {
    return this.httpService.delete("", "ResmiTatils", id);
  }
}