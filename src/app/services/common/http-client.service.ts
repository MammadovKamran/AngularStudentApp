import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../models/paginationResponse';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private url(parameters: Partial<RequestParams>) {
    return `${parameters.baseUrl ? parameters.baseUrl : this.baseUrl}/${parameters.controller}/${parameters.action ? parameters.action : ""}${parameters.queryString ? parameters.queryString : ""}`
  }

  getAll<T>(parameters: Partial<RequestParams>): Observable<T[]> {
    let url: string = "";

    if (parameters.fullEndpoint)
      url = parameters.fullEndpoint;
    else
      url = this.url(parameters);

    return this.httpClient.get<T[]>(url, { headers: parameters.headers });
  }

  getAllPagination<T>(parameters: Partial<RequestParams>): Observable<PaginationResponse<T>> {
    let url: string = "";

    if (parameters.fullEndpoint)
      url = parameters.fullEndpoint;
    else
      url = this.url(parameters);

    return this.httpClient.get<PaginationResponse<T>>(url, { headers: parameters.headers });
  }

  get<T>(parameters: Partial<RequestParams>, id?: string): Observable<T> {

    let url: string = "";

    if (parameters.fullEndpoint)
      url = parameters.fullEndpoint
    else
      url = `${this.url(parameters)}${id ? `/${id}` : ""}`;

    return this.httpClient.get<T>(url, { headers: parameters.headers })
  }

  post<T>(parameters: Partial<RequestParams>, body: Partial<T>): Observable<T> {
    let url: string = "";

    if (parameters.fullEndpoint)
      url = parameters.fullEndpoint
    else
      url = `${this.url(parameters)}`;

      console.log(body);
      
    return this.httpClient.post<T>(url, body, { headers: parameters.headers });
  }

  put<T>(parameters: Partial<RequestParams>, body: Partial<T>): Observable<T> {
    let url: string = "";

    if (parameters.fullEndpoint)
      url = parameters.fullEndpoint
    else
      url = `${this.url(parameters)}`;

      console.log(body);
      
    return this.httpClient.put<T>(url, body, { headers: parameters.headers });
  }

  delete<T>(parameters: Partial<RequestParams>, parameter : any) : Observable<boolean>{
    let url: string = "";

    if (parameters.fullEndpoint)
      url = parameters.fullEndpoint
    else
      url = `${this.url(parameters)}${parameter}`;

      return this.httpClient.delete<boolean>(url,{headers: parameters.headers})
  }
}

export class RequestParams {
  controller?: string;
  action?: string;
  queryString? : string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
  
}