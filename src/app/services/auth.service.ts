/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Observable, Subscription, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$ = authState(this.auth);
  authStateSubscription?: Subscription;

  constructor(private auth: Auth) {}

  Login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  Logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}
