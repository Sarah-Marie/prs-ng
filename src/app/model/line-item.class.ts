import { Product } from './product.class';
import { User } from './user.class';
import { Request } from './request.class';

export class LineItem {

    id: number;
    user: User;
    request: Request;
    product: Product;
    price: number;
    total: number;
    quantity: number;
   

    constructor (id: number = 0, user: User = new User(), request: Request = null,  
                product: Product = null, price: number = 0, total: number = 0, quantity: number = 0) {
                    this.id = id;
                    this.user = user;
                    this.request = request;
                    this.product = product;
                    this.price = price;
                    this.total = total;
                    this.quantity = quantity;
                }




}



