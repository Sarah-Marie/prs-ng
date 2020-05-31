import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class'
import { User } from 'src/app/model/user.class';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {
  title: string = 'Purchase-Request-Line-Items';
  titleLineItems: string = 'Line Items'
  request: Request = new Request();
  lineItems: LineItem[] = [];
  loggedInUser: User = new User;
  requestId: number = 0;
  submitBtnTitle: string = "Submit For Review";
  lineItemId: number = 0;
  lineItem: LineItem = new LineItem();



  constructor(private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;

    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Found User Request", this.request);
    });

    this.lineItemSvc.listLineItemsRequest(this.requestId).subscribe(jr => {
      this.lineItems = jr.data as LineItem[];
      console.log("Line Items", this.lineItems);
    });

    


  }

  submitRequestToReview() {
    this.requestSvc.submitRequestToReview(this.request).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/requests/list");
      } 
      else {
        console.log("***Error submitting request", this.request, jr.errors);
      }
    });
  }
  
  delete(lineItemId: number) {

    console.log("delete line item for id: " + lineItemId);
    this.lineItemSvc.delete(lineItemId).subscribe(jr => {
      if (jr.errors==null) {
        this.router.navigateByUrl("requests/request-lines/refresh/" + this.requestId);
      }
      else {
        console.log("*** error deleting a line item", jr.errors);
      }
    });
  }

}
