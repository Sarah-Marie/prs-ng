import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class'

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  request: Request = new Request();
  title: string ='Request-Detail';
  requestId: number = 0;

  constructor(  private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
//get the id from the route
this.route.params.subscribe(parms => this.requestId = parms['id']);

// get the request for that requestId
this.requestSvc.get(this.requestId).subscribe(jr => {
  this.request = jr.data as Request;
  console.log("Request Found!  ",this.request);
});

  }

  delete() {
    this.requestSvc.delete(this.requestId).subscribe(jr => {
      if (jr.errors==null) {
        console.log(jr.data);
        this.router.navigateByUrl("/requests/list");
      }
      else {
        console.log("***Error deleting request!", this.requestId, jr.errors);
      }
    });
  }

}
