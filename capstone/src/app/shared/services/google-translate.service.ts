import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleObj } from '../models/GoogleObj';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleTranslateService {
  url = 'https://translation.googleapis.com/language/translate/v2?key=';
  key = 'AIzaSyD0hWiRD7x16f0ndKiJ1wfToV6C8Pr-orI';
  constructor(private http: HttpClient) {}

  translate(obj: GoogleObj): Observable<object> {
    return this.http.post(this.url + this.key, obj);
  }
}
