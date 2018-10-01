import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {s} from '@angular/core/src/render3';
import {Product} from './models/product';
import 'rxjs/add/operator/take';
import {ShoppingCart} from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {

    constructor(private db: AngularFireDatabase) {
    }

    private create() {
        return this.db.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        });
    }

    async getCart(): Promise<FirebaseObjectObservable<ShoppingCart>> {
        let cartId = await this.getOrCreateCartId()
        return this.db.object('/shopping-carts/' + cartId);
    }

    private getItems(cartId: string, productId: string){
        return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
    }

    private async getOrCreateCartId(): Promise<string> {
        let cartId = localStorage.getItem('cartId');
        if (cartId) return cartId;

        let result = await this.create();
        localStorage.setItem('cartId', result.key);
        return result.key;
    }

    async addToCart(product: Product) {
        this.updateItemQuantity( product, 1);
    }

    async removeFromCart(product: Product) {
        this.updateItemQuantity( product, -1);
    }

    private async updateItemQuantity(product: Product, change: number) {
        let cartId = await this.getOrCreateCartId();
        let item$ = this.getItems(cartId, product.$key);
        item$.take(1).subscribe(item => {
            item$.update({product: product, quantity: (item.quantity || 0) + change});
        });
    }
}