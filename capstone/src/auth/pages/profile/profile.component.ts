import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent{
  updateForm: FormGroup;
  isMessageVisible: boolean;
  message: string;
  inputData: User;

  constructor(
    private form: FormBuilder,
    private api: ApiService
  ) {
    this.updateForm = this.form.group({
      userRole: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      contact: ['', Validators.required]
    });

    this.inputData = new User();
  }

  updateProfile(event: FormGroup): void {
    this.inputData = {
      userID: 0,
      userRole: event.value.userRole,
      userName: event.value.userName,
      userEmail: sessionStorage.getItem('email'),
      password: event.value.password,
      contact: event.value.contact,
    };

    this.api.updateProfile(this.inputData).subscribe({
      next: (res: { message: string; authToken: string }) => {
        this.isMessageVisible = true;
        this.message = res.message;
        sessionStorage.setItem('authToken', res.authToken);
        sessionStorage.setItem('email', this.inputData.userEmail);
        sessionStorage.setItem('role', this.inputData.userRole);
        event.reset();
        window.location.reload();
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
