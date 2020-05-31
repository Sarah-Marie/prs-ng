import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { User } from 'src/app/model/user.class';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { UserService } from 'src/app/service/user.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {

  title: string = "Line-Item-Edit";
  lineItem: LineItem = new LineItem();
  products: Product[] = [];
  submitBtnTitle: string = "Edit";
  lineItemId: number = 0;
  loggedInUser: User = new User;
  
 
  

  constructor(private lineItemSvc: LineItemService, 
    private productSvc: ProductService,
    private userSvc: UserService,
    private requestSvc: RequestService,
    protected sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;

    //get a line item
  this.route.params.subscribe(parms => this.lineItemId = parms["id"]);
  this.lineItemSvc.get(this.lineItemId).subscribe(jr => {
    console.log("line item edit",jr);
    this.lineItem = jr.data as LineItem;
   
  });

  // get a list of products 
  this.productSvc.list().subscribe(jr => {
    this.products = jr.data as Product[];
  });

  }

  // edit line item

  save() {
    this.lineItemSvc.edit(this.lineItem).subscribe(jr => {
      console.log("edit a line item",+this.lineItem);
      //if jr.errors is null, save was successful
      if (jr.errors==null) {
        //success
        this.router.navigateByUrl("/requests/request-lines/" + this.lineItem.request.id);
      } //show error message for line item creation
      else {
        console.log("***Error editing  line item:", this.lineItem, jr.errors);
      }
    });

    
  }
  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id == b.id;
  }

}