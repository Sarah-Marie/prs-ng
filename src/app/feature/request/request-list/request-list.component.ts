import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class'
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  title: string = "Purchase-Request-List";
  requests: Request[] = [];
  request: Request = new Request();
  user: User = null;

  constructor( private requestSvc: RequestService,
    private systemSvc: SystemService) { }

  ngOnInit(): void {
    this.systemSvc.checkLogin();
    this.user = this.systemSvc.loggedInUser;
    // call our request service to populate the list of requests
    this.requestSvc.list().subscribe(
      jr => { 
        this.requests = jr.data as Request []
        console.log("list of requests",this.requests);
      }
    );
  }

}
