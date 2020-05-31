import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  loggedInUser: User = null;
  reviewer: boolean;

  constructor(private sysSvc: SystemService) { }
    

  ngOnInit(): void {
    this.sysSvc.checkLogin();
   this.loggedInUser = this.sysSvc.loggedInUser;
    
    this.menuItems = [
      
      new MenuItem("User", "user/list", "User List"),
      new MenuItem("Vendor", "/vendor/list", "Vendor List"),
      new MenuItem("Product", "/products/list", "Product List"),
      new MenuItem("Request", "/requests/list", "Request List"),
      new MenuItem("Review", "/requests/list-review/"+this.loggedInUser.id, "Request Review"),
      new MenuItem("Login","/user/login","Login"),
      
    ]
    
   
  }

}
