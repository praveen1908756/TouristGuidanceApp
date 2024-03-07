import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userRole: string;
  users: User[];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.users = [];
    this.userRole = sessionStorage.getItem('role');

    this.api.getUsers().subscribe({
      next: (res: User[]) => {
        this.users = res;
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  deleteUser(emailID: string): void {
    this.api.deleteUserByEmail(emailID).subscribe({});
    window.location.reload();
  }

  editUser(emailID: string): void{
    this.router.navigateByUrl(`auth/users/${emailID}`);
  }
}
