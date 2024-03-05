import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Solution } from '../models/Solution';

@Injectable({
  providedIn: 'root',
})
export class SolutionServiceService {
  data = {
    title: '',
    description: '',
    detail: '',
  };

  constructor(private http: HttpClient) {}

  getSolution(): Observable<Solution> {
    return this.http.get<Solution>('assets/data.json').pipe(
      map((res) => {
        this.data.title = res.title;
        this.data.description = res.description;
        this.data.detail = res.detail;
        return this.data;
      })
    );
  }
}
