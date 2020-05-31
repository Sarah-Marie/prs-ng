import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class'
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {
  title: string = "Request-Approve/Reject";
  request: Request = new Request();
  
  userId: number;
  requestId: number = 0;
  loggedInUser: User = new User;
  lineItems: LineItem[] = [];
  rejectBtnTitle: string = "Reject";
  submitBtnTitle: string = "Approve";


  constructor(private userSvc: UserService,
    private requestSvc: RequestService,
    protected sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute,
    private lineItemSvc: LineItemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;

    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
    });
    this.lineItemSvc.listLineItemsRequest(this.requestId).subscribe(jr => {
      this.lineItems = jr.data as LineItem[];
      console.log("Line Items", this.lineItems);
    });


  }
  approve() {
    this.requestSvc.approve(this.request).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl('/requests/list-review/' + this.loggedInUser.id);
      } else {
        console.log('***Error with request approval', this.requestSvc, + jr.errors);
      }
    });
  }

  reject() {
    this.requestSvc.reject(this.request).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl('/requests/list-review/' + this.loggedInUser.id);
      }
      else {
        console.log('***Error rejecting request', this.request, + jr.errors);
      }
    });

  }
}


