import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class'
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';
import { RequestService } from 'src/app/service/request.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title: string = "Request-List-Review";
  requests: Request[] = [];
  user: User = null;
  userId: number = 0;
 

  constructor(private userSvc: UserService,
    private requestSvc: RequestService,
    protected sysSvc: SystemService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
   
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
     
      this.requestSvc.listReview(this.user.id).subscribe(jr => {
        this.requests = jr.data as Request[];
        console.log("List of Requests", this.requests);
      
      
      });
 

} 



}
