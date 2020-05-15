import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  title: string = "User-List";

  users: User[] = [];

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.userSvc.list().subscribe(
      jr => {
      this.users = jr.data as User[]
      console.log("List of users",this.users);
    });
  }

}
