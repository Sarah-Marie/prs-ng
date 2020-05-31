import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class'
import { Product } from 'src/app/model/product.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {
  title: string = "Line-Item-Create";
  requestId: number = 0;
  products: Product[] = [];
  submitBtnTitle: string = "Create";
  loggedInUser: User = new User;
  lineItem: LineItem = new LineItem;


  constructor(private lineItemSvc: LineItemService, private requestSvc: RequestService,
    private productSvc: ProductService, private userSvc: UserService,
    private sysSvc: SystemService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;

    //get request from ID
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.lineItem.request = jr.data as Request;
      console.log("***Request was found", this.lineItem.request);
    });

    // get a list of products 
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });

  }
  create() {
    this.lineItemSvc.create(this.lineItem).subscribe(jr => {
      //if jr.errors is null, save was successful
      if (jr.errors == null) {
        //success
        this.router.navigateByUrl("/requests/request-lines/" + this.lineItem.request.id);
      } //show error message for line item creation
      else {
        console.log("***Error creating new line item:", this.lineItem, jr.errors);
      }
    });
  }

}
