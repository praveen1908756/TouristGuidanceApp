import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  emailID: string;
  user: User;
  isMessageVisible: boolean;
  message: string;
  editUserForm: FormGroup;
  inputData: User;

  constructor(
    private api: ApiService,
    private ar: ActivatedRoute,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((map) => {
      this.emailID = map.get('emailID');
    });

    this.editUserForm = this.form.group({
      userID: ['', Validators.required],
      userRole: ['', Validators.required],
      userName: ['', Validators.required],
      userEmail: [
        { value: this.emailID, disabled: false },
        Validators.required,
      ],
      contact: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.editUserForm.controls['userEmail'].disable();

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

  editUser(event: FormGroup): void {
    this.inputData = {
      userID: 0,
      userRole: event.value.userRole,
      userName: event.value.userName,
      userEmail: '',
      contact: event.value.contact,
      password: event.value.password,
    };

    this.api.editUserByEmail(this.inputData).subscribe({
      next: (res: string) => {
        this.isMessageVisible = true;
        this.message = res;
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
