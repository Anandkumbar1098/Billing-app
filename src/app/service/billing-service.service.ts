import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingServiceService {

  constructor(private http: HttpClient) { }

  getbills(Data:any):Observable<any> {
    return this.http.post('http://localhost:5000/bills',Data)
  }

  getbill(Data:any):Observable<any> {
    return this.http.post('http://localhost:5000/getbill',Data)
  }

  addbill(Data:any):Observable<any> {
    console.log(Data)
    return this.http.post('http://localhost:5000/addbill',Data)
  }
  getAnalyticsPieGraph(Data:any):Observable<any> {
    console.log(Data)
    return this.http.post('http://localhost:5000/PieChart/Groupby/desc',Data)
  }

}
