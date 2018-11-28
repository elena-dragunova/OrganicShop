import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "shared/services/auth.service";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate( route, state: RouterStateSnapshot ) {
        /*this.auth.user$.subscribe(user => {
            if (user) return true;

            this.router.navigate(['/login']);
            return false;
        })*/

        return this.auth.user$.map(user => {
            if (user) return true;

            this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
            return false;
        });
    }
}