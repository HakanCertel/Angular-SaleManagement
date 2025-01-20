import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { map, Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private url="https://ordermanagement-6ac53-default-rtdb.firebaseio.com/"
  
  constructor(private http:HttpClient) { }
  
  
  getCustomers(id?:string):Observable<Customer[]>{

    return this.http.get<Customer[]>(this.url+"customers.json")
      .pipe(map(result=>{
          const customers:Customer[]=[];

          for(const key in result){
            if(id==result[key].id){
              customers.push({...result[key],id:key})
            }else{
              customers.push({...result[key],id:key})
            }
          }
          return customers;
      }))
  }
  getCustomerbyId(id:string):Observable<Customer>{
    return this.http.get<Customer>(this.url+"customers/"+id+".json");
  }
  creatCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(this.url+"customers.json",customer);
  }
  updateCustomer(id:string,customer:Customer):Observable<Customer>{
    return this.http.put<Customer>(this.url+"customers/"+id+".json",customer)
  }
  deleteCustomer(id:string){
    this.http.delete(this.url+"customers/"+id+".json").subscribe(()=>console.log("delete"));
  }
}
