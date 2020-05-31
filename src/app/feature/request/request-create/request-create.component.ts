import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class'
import { RequestService } from 'src/app/service/request.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = "Request-Create";
  request: Request = new Request();
  user: User = null;
  submitBtnTitle: string = "Create Request";

  constructor(private requestSvc: RequestService,
    private router: Router,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
    this.request.user = this.user;
  }
  save() {
    this.requestSvc.create(this.request).subscribe(jr => {
      //if jr.errors is null, save was successful
      if (jr.errors==null) {
        //success
        this.router.navigateByUrl("/requests/list");
      }
      else {
        console.log("***Error creating new request:", this.request, jr.errors);
      }
    }

    );
  }
  submitRequestToReview() {
    this.requestSvc.submitRequestToReview(this.request).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("requests/list");
      } 
      else {
        console.log("***Error submitting request", this.request, jr.errors);
      }
    });
  }

}
