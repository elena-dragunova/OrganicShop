import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "shared/services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "shared/models/product";
import 'rxjs/add/operator/switchMap';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    filteredProducts: Product[];
    category: string;
    cart: any;
    subscription: Subscription;

    constructor(route: ActivatedRoute,
                productService: ProductService,
                private shoppingCartService: ShoppingCartService) {
        productService
            .getAll()
            .switchMap(products => {
                this.products = products;
                return route.queryParamMap;
            })

            .subscribe(params => {
                    this.category = params.get('category');
                    this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
                }
            );
    }

    async ngOnInit() {
        this.subscription = (await this.shoppingCartService.getCart())
            .subscribe(cart => this.cart = cart);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
