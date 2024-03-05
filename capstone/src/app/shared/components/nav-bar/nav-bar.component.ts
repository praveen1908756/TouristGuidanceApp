import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { ApiService } from '../../services/api.service';
import { GoogleTranslateService } from '../../services/google-translate.service';
import { FormControl } from '@angular/forms';
import { Solution } from '../../models/Solution';
import { SolutionServiceService } from '../../services/solution-service.service';
import { Router } from '@angular/router';

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
  lang = new FormControl('en');
  data: Solution = {
    title: '',
    description: '',
    detail: '',
  };

  constructor(
    private api: ApiService,
    private google: GoogleTranslateService,
    private solution: SolutionServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.solution.getSolution().subscribe((res) => (this.data = res));
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
    this.router.navigateByUrl('');
    window.location.reload();
  }

  changeLang(): void {
    // const googleObj: GoogleObj = {
    //   q: [this.data.title, this.data.description, this.data.detail],
    //   target: this.lang.value,
    // };

    // this.google.translate(googleObj).subscribe(
    //   (res: any) => {
    //     this.data = {
    //       title: res.data.translations[0].translatedText,
    //       description: res.data.translations[1].translatedText,
    //       detail: res.data.translations[2].translatedText,
    //     };
    //     console.log(this.data);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
}
