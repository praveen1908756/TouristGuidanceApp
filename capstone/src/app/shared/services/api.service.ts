import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { City } from '../models/City';
import { Places } from '../models/Places';
import { User } from '../models/User';
import { Bookings } from '../models/Bookings';
import { Reviews } from '../models/Reviews';
import { CityReview } from '../models/CityReview';

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

  //-----------------------------------------------------CITIES API CALLS

  getCities(): Observable<City[]> {
    return this.http.get<City[]>('https://localhost:7236/getCities');
  }

  //get one city by cityID
  getCityByID(cityID: number): Observable<City> {
    return this.http.get<City>(
      `https://localhost:7236/getCityByID?id=${cityID}`
    );
  }

  addCity(inputData: City): Observable<string> {
    const authToken = sessionStorage.getItem('authToken');

    return this.http.post<string>('https://localhost:7236/addCity', inputData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  editCity(inputData: City): Observable<string> {
    const authToken = sessionStorage.getItem('authToken');

    return this.http.put<'City Edited!'>(
      'https://localhost:7236/editCity',
      inputData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
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

  //-----------------------------------------------------PLACES API CALLS

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

  editPlace(inputData: Places): Observable<string> {
    const authToken = sessionStorage.getItem('authToken');

    return this.http.put<'Place Edited!'>(
      'https://localhost:7236/editPlace',
      inputData,
      {
        headers: {
          'Content-Type': 'application/json',
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

  //-----------------------------------------------------REVIEWS API CALLS

  getReviewsByID(placeID: number): Observable<Reviews[]> {
    return this.http.get<Reviews[]>(
      `https://localhost:7236/getReviewByID?placeID=${placeID}`
    );
  }

  getCityReviewsByID(cityID: number): Observable<CityReview[]> {
    return this.http.get<CityReview[]>(
      `https://localhost:7236/getCityReviewByID?cityID=${cityID}`
    );
  }

  addReview(inputData: Reviews): Observable<string> {
    return this.http.post<string>(
      'https://localhost:7236/addReview',
      inputData,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  addCityReview(inputData: CityReview): Observable<object> {
    return this.http.post<object>(
      'https://localhost:7236/addCityReview',
      inputData,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  //-----------------------------------------------------BOOKINGS API CALLS

  bookPlace(book: Bookings): Observable<string> {
    return this.http.post<string>('https://localhost:7236/bookPlace', book);
  }

  getBookings(emailID: string): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(
      `https://localhost:7236/getBookings?email=${emailID}`
    );
  }

  //-----------------------------------------------------USERS API CALLS

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

  getUsers(): Observable<User[]> {
    const authToken = sessionStorage.getItem('authToken');

    return this.http.get<User[]>('https://localhost:7236/getUsers', {
      headers: { Authorization: `Bearer ${authToken}` },
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

  editUserByEmail(inputData: User): Observable<string> {
    const authToken = sessionStorage.getItem('authToken');

    return this.http.put<'User Details Updated!'>(
      'https://localhost:7236/updateUserByEmail',
      inputData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  }

  deleteUserByEmail(emailID: string): Observable<void> {
    const authToken = sessionStorage.getItem('authToken');

    return this.http.delete<void>(
      `https://localhost:7236/deleteUserByEmail?emailID=${emailID}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  }

  //-----------------------------------------------------
}
