import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  isMessageVisible: boolean;
  message: string;
  inputData: User;

  constructor(
    private api: ApiService,
    private form: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.form.group({
      userEmail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser(event: FormGroup): void {
    this.inputData = {
      userID: 0,
      userRole: '',
      userName: '',
      userEmail: event.value.userEmail,
      contact: 0,
      password: event.value.password
    };

    this.api.getUserDetails(this.inputData.userEmail).subscribe({
      next: (res: User) => {
        sessionStorage.setItem('role', res.userRole);
        this.inputData.userRole = res.userRole;

        this.api.loginUser(this.inputData).subscribe({
          next: (res: { message: string; authToken: string }) => {
            this.isMessageVisible = true;
            this.message = res.message;
            sessionStorage.setItem('authToken', res.authToken);
            sessionStorage.setItem('email', this.inputData.userEmail);
            sessionStorage.setItem('role', this.inputData.userRole);
            event.reset();
            if (this.message === 'Logged In!') {
              this.router.navigate(['/auth/dashboard']);
            }
          },
          error: (err: Error) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  ngOnDestroy(): void {
    window.location.reload();
  }
}
