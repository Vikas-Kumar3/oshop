import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private userService: UserService) { }

  canActivate() {
    return this.auth.appUser$.pipe(map(appUser=> appUser.isAdmin));
  }
}
