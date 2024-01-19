import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router
  ) {
   
  }
  signUp(username: string, email: string, password: any) {
    this.afauth.createUserWithEmailAndPassword(email, password).then((res) => {
      res.user?.updateProfile({
        displayName: username,
      });
      this.setUserData(res.user);
      this.afauth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['']);
        }
      });
    });
  }
  signIn(email: string, password: any) {
    this.afauth.signInWithEmailAndPassword(email, password).then((res) => {
      if (res) {
        this.setUserData(res.user);
        this.router.navigate(['']);
      }
    });
  }
  logOut() {
    this.afauth.signOut().then(() => {
      this.router.navigate(['sign-up']);
    });
  }
  setUserData(user: any) {
    const userref: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    userref.set(
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      },
      { merge: true }
    );
  }
}
