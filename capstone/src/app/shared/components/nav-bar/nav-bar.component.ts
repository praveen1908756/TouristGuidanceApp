import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { urls } from '../../links/urls';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  authToken: string;
  user: User;
  emailID: string;
  userRole: string;
  texts = {
    t1: 'Home',
    t2: 'Tourist Attractions',
    t3: 'Restaurants',
    t4: 'Accommodations',
    t5: 'View Users',
    t6: 'Update Profile',
    t7: 'Logout',
    t8: 'Tourist',
    t9: 'Guidance App',
  };

  constructor(
    private api: ApiService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role');
    this.emailID = sessionStorage.getItem('email');
    this.userRole = sessionStorage.getItem('role');
    this.checkLogin();
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.api.getUserDetails(this.emailID).subscribe({
      next: (res: User) => {
        this.user = res;
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  checkLogin(): void {
    this.authToken = sessionStorage.getItem('role');
  }

  logoutUser(): void {
    sessionStorage.setItem('authToken', '');
    sessionStorage.setItem('email', '');
    sessionStorage.setItem('role', '');
    window.location.reload();
    this.router.navigate(['/auth/dashboard']);
  }
  
  translate(event: any): void {
    if (event.target.value === 'en') {
      window.location.reload();
    }

    this.http
      .post(
        `https://translation.googleapis.com/language/translate/v2?key=${urls.key}`,
        {
          q: [
            this.texts.t1,
            this.texts.t2,
            this.texts.t3,
            this.texts.t4,
            this.texts.t5,
            this.texts.t6,
            this.texts.t7,
            this.texts.t8,
            this.texts.t9,
          ],
          target: event.target.value,
        }
      )
      .subscribe({
        next: (res: { data: { translations: { translatedText: string } } }) => {
          this.texts.t1 = res.data.translations[0].translatedText;
          this.texts.t2 = res.data.translations[1].translatedText;
          this.texts.t3 = res.data.translations[2].translatedText;
          this.texts.t4 = res.data.translations[3].translatedText;
          this.texts.t5 = res.data.translations[4].translatedText;
          this.texts.t6 = res.data.translations[5].translatedText;
          this.texts.t7 = res.data.translations[6].translatedText;
          this.texts.t8 = res.data.translations[8].translatedText;
          this.texts.t9 = res.data.translations[9].translatedText;
        },
        error: (err: Error) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
}
