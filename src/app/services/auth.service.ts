import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAPIResponse } from '../models/api-response';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private baseURL = environment.baseURL;
    private userObs: Subject<IUser> = new Subject();
    public user: IUser | null = null;

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string): Observable<IAPIResponse<{ accessToken: string, expiresAt: number }>> {
        return this.http.post<IAPIResponse<{ accessToken: string, expiresAt: number, user: IUser }>>(this.baseURL + '/v1/login', { email, password })
            .pipe(map((res) => {
                if(res.success) {
                    localStorage.setItem('token', res.data.accessToken);
                    this.userObs.next(res.data.user)
                    this.user = res.data.user;
                }
                return res;
            }));
    }

    register(data: { email: string, age: number, password: string } ): Observable<IAPIResponse<IUser>> {
        return this.http.post<IAPIResponse<IUser>>(this.baseURL + '/v1/register', data);
    }

    getSelf(): Observable<IAPIResponse<IUser>> {
        return this.http.get<IAPIResponse<IUser>>(this.baseURL + '/v1/self').pipe(delay(2000))
            .pipe(map((res) => {
                if(res.success) {
                    this.userObs.next(res.data)
                }
                return res;
            }))
    }

    isLoggedIn() {
        let data = localStorage.getItem('token');
        return data ? true : false;
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['auth/login']);
    }

    getUser(): Observable<IUser> {
        return this.userObs.asObservable();
    }
}