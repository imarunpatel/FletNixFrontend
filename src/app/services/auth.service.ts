import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAPIResponse } from '../models/api-response';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private baseURL = environment.baseURL;

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<IAPIResponse<{ accessToken: string, expiresAt: number }>> {
        return this.http.post<IAPIResponse<{ accessToken: string, expiresAt: number }>>(this.baseURL + '/v1/login', { email, password });
    }

}