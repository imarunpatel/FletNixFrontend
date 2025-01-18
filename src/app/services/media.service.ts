import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAPIResponse } from '../models/api-response';
import { IMedia } from '../models/media.model';
import { IMediaResponse } from '../models/response/mediaResponse';

@Injectable({ providedIn: 'root' })
export class MediaService {
  private baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  getMedia(page: number, type: string, query: string): Observable<IAPIResponse<IMediaResponse>> {
    return this.http.get<IAPIResponse<IMediaResponse>>(this.baseURL + `/v1/media/?page=${page}&type=${type}&query=${query}`);
  }
}
