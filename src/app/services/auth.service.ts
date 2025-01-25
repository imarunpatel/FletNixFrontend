import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAPIResponse } from '../models/api-response';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly baseURL = environment.baseURL;
    private readonly TOKEN_KEY = 'token';
    private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
    public user$ = this.userSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string): Observable<IAPIResponse<{ accessToken: string, expiresAt: number }>> {
        return this.http.post<IAPIResponse<{ accessToken: string, expiresAt: number, user: IUser }>>
            (`${this.baseURL}/v1/login`, { email, password })
            .pipe(map((res) => {
                if(res.success) {
                    localStorage.setItem(this.TOKEN_KEY, res.data.accessToken);
                    this.userSubject.next(res.data.user);
                }
                return res;
            }));
    }

    register(data: { email: string, age: number, password: string }): Observable<IAPIResponse<IUser>> {
        return this.http.post<IAPIResponse<IUser>>(`${this.baseURL}/v1/register`, data);
    }

    getSelf(): Observable<IAPIResponse<IUser>> {
        return this.http.get<IAPIResponse<IUser>>(`${this.baseURL}/v1/self`)
            .pipe(map((res) => {
                if(res.success) {
                    this.userSubject.next(res.data);
                }
                return res;
            }));
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.userSubject.next(null);
        this.router.navigate(['auth/login']);
    }
}