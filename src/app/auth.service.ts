import { AppUser } from './models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
      this.user$ =  afAuth.authState;
   }
  
  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);

    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
    //                 .then(loggedInUser => {
    //                   this.userService.save(loggedInUser.user);
    //                   this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl'));
    //                 });
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser>{
    return this.user$
      .pipe(switchMap(user => {
          if(user) return this.userService.get(user.uid).valueChanges()

          return of(null);
        }));
  }
}
