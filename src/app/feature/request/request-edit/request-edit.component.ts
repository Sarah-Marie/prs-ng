import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class'
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
  title: string = "Request-Edit";
  submitBtnTitle: string = "Edit";
  request: Request = new Request();
  requestId: number = 0;
  users: User[] = [];
  loggedInUser: User = new User;

  constructor(private userSvc: UserService,
    private requestSvc: RequestService,
    protected sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
    });
    this.userSvc.list().subscribe(jr => {
      this.users = jr.data as User[];
    });
  }

  save() {
    this.requestSvc.edit(this.request).subscribe(jr => {
      if (jr.errors == null) {
        //success
        this.router.navigateByUrl("/requests/list");
      }
      else {
        console.log("***Error editing request.", this.request, jr.errors);
      }
    });

  }

}
