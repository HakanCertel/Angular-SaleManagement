import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Order } from './order';
import { map, Observable } from 'rxjs';
import { CustomerService } from '../Customer/customer.service';
import { OrderDto } from './orderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url="https://ordermanagement-6ac53-default-rtdb.firebaseio.com/"
  orderDto:OrderDto;

  constructor(
    private http:HttpClient,
    private customerService:CustomerService
  ) { }
 
  getOrders(id?:string):Observable<OrderDto[]>{
    return this.http.get<OrderDto[]>(this.url+"orders.json")
      .pipe(map(data=>{
          const orders:OrderDto[]=[];
          for(const key in data){
            this.customerService.getCustomerbyId(data[key].customerId).subscribe(cus=>{
              this.orderDto={
                id:key,
                code:data[key].code,
                customerId:data[key].customerId,
                customerName:cus.name,
                orderDate:data[key].orderDate,
                isActive:data[key].isActive,
              }
              orders.push(this.orderDto);
            })
          }
          return orders;
      }))
  }
  getOrderById(id:string):Observable<Order>{
    return this.http.get<Order>(this.url+"orders/"+id+".json");
  }
  createOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(this.url+"orders.json",order);
  }
  updateOrder(id:string,order:Order):Observable<Order>{
    return this.http.put<Order>(this.url+"orders/"+id+".json",order);
  }
  deleteOrder(id:string){
    this.http.delete(this.url+"orders/"+id+".json");
  }
}
