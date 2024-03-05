import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  inputData: User;
  isMessageVisible: boolean;
  message: string;

  constructor(private api: ApiService, private form: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.form.group({
      userID: ['', Validators.required],
      userRole: ['', Validators.required],
      userName: ['', Validators.required],
      userEmail: ['', Validators.required],
      password: ['', Validators.required],
      contact: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.isMessageVisible = false;
    this.inputData = new User();
  }

  registerUser(event: FormGroup): void {
    this.inputData = {
      userID: 0,
      userRole: event.value.userRole,
      userName: event.value.userName,
      userEmail: event.value.userEmail,
      password: event.value.password,
      contact: event.value.contact,
    };

    this.api.registerUser(this.inputData).subscribe({
      next: (res: { message: string }) => {
        console.log(res);
        this.message = res.message;
        this.isMessageVisible = true;
        event.reset();
      },
      error: (err: Error) => {
        console.log(err);
        event.reset();
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
