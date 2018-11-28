import {Component, Input} from '@angular/core';
import {Product} from 'shared/models/product';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
    @Input('product') product: Product;
    @Input('shopping-cart') shoppingCart;

    constructor(private cartServive: ShoppingCartService) { }

    addToCart() {
        this.cartServive.addToCart(this.product);
    }

    removeFromCart() {
        this.cartServive.removeFromCart(this.product);
    }



}
