import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { City } from '../models/City';
import { Places } from '../models/Places';
import { User } from '../models/User';
import { Bookings } from '../models/Bookings';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private cityID = new BehaviorSubject<number>(null);
  currCityID = this.cityID.asObservable();

  private placeID = new BehaviorSubject<number>(null);
  currPlaceID = this.cityID.asObservable();

  constructor(private http: HttpClient) {}

  transferCityID(cityID: number): void {
    this.cityID.next(cityID);
  }

  transferPlaceID(placeID: number): void {
    this.cityID.next(placeID);
  }

  //get all cities
  getCities(): Observable<City[]> {
    return this.http.get<City[]>('https://localhost:7236/getCities');
  }

  deleteCityByID(cityID: number): Observable<string> {
    const authToken = sessionStorage.getItem('authToken');

    return this.http.delete<string>(
      `https://localhost:7236/deleteCity?id=${cityID}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  }

  deletePlaceByID(placeID: number): Observable<object> {
    const authToken = sessionStorage.getItem('authToken');

    return this.http.delete<object>(
      `https://localhost:7236/deletePlace?id=${placeID}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  }

  addCity(inputData: City): Observable<string> {
    const authToken = sessionStorage.getItem('authToken');

    return this.http.post<string>('https://localhost:7236/addCity', inputData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  addPlace(inputData: Places): Observable<object> {
    const authToken = sessionStorage.getItem('authToken');

    return this.http.post<object>(
      'https://localhost:7236/addPlace',
      inputData,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  }

  //get all places by a single cityID
  getPlacesByID(cityID: number): Observable<Places[]> {
    return this.http.get<Places[]>(
      `https://localhost:7236/getPlacesByID?id=${cityID}`
    );
  }

  //get one place by placeID
  getPlaceByID(placeID: number): Observable<Places> {
    return this.http.get<Places>(
      `https://localhost:7236/getPlaceByID?id=${placeID}`
    );
  }

  //get one city by cityID
  getCityByID(cityID: number): Observable<City> {
    return this.http.get<City>(`https://localhost:7236/getCityByID?id=${cityID}`);
  }

  bookPlace(book: Bookings): Observable<string> {
    return this.http.post<string>('https://localhost:7236/bookPlace', book);
  }

  getBookings(emailID: string): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(`https://localhost:7236/getBookings?email=${emailID}`);
  }

  registerUser(inputData: User): Observable<object> {
    return this.http.post<object>(
      'https://localhost:7236/register',
      inputData,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  loginUser(inputData: User): Observable<object> {
    return this.http.post<object>('https://localhost:7236/login', inputData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getUserDetails(email: string): Observable<User> {
    return this.http.get<User>(
      `https://localhost:7236/getUserByEmail?email=${email}`
    );
  }

  updateProfile(inputData: User): Observable<object> {
    return this.http.put<object>(
      'https://localhost:7236/updateProfile',
      inputData,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
