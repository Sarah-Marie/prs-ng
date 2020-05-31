import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { LineItem } from '../model/line-item.class';

const url: string = 'http://localhost:8080/line-items/';
@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor(private http: HttpClient) { }


  list(): Observable<JsonResponse> {
    return this.http.get(url) as Observable<JsonResponse>;

  }

  get(id: number): Observable<JsonResponse> {
    return this.http.get(url+id) as Observable<JsonResponse>;

  }

  create(lineItem: LineItem): Observable<JsonResponse> {
    return this.http.post(url,lineItem) as Observable<JsonResponse>;

  }

  edit(lineItem: LineItem): Observable<JsonResponse> {
    return this.http.put(url,lineItem) as Observable<JsonResponse>;

  }

  delete(id: number): Observable<JsonResponse> {
    return this.http.delete(url+id) as Observable<JsonResponse>;

  }

  review(id: number): Observable<JsonResponse> {
    console.log("request svc review",id);
    return this.http.get(url + 'list-review/' + id) as Observable<JsonResponse>;
  }

  approve(request: Request): Observable<JsonResponse> {
    
    return this.http.put(url + 'approve', request) as Observable<JsonResponse>;
  }

  reject(request: Request): Observable<JsonResponse> {
    return this.http.put(url + 'reject', request) as Observable<JsonResponse>;
  }

  listLineItemsRequest(id: number): Observable<JsonResponse> {
    return this.http.get(url + '/lines-for-pr/' + id) as Observable<JsonResponse>;
  }


}
