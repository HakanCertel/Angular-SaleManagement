import { HttpClient } from '@angular/common/http';
import { Injectable, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from './order';
import { OrderDetail } from './order-details';
import { OrderDetailDTO } from './order-detaisDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  private url="https://ordermanagement-6ac53-default-rtdb.firebaseio.com/";
  
  _orderDetails:OrderDetailDTO[]=[]
 
  constructor(private http:HttpClient) { }
 
  getOrderDetails(orderNo?:string):Observable<OrderDetailDTO[]>{
    return this.http.get<OrderDetailDTO[]>(this.url+"/orderDetail.json")
     .pipe(map(data=>{
       const ordDet:OrderDetailDTO[]=[];
         for(const key in data){
          if(orderNo){
            if(orderNo==data[key].orderId){
              
              ordDet.push({...data[key],id:key})
            }else{
              console.log("detail service else")
            }
          }else{
            ordDet.push({...data[key],id:key})
          }
         }
         return ordDet;
     }));
  }
  createOrderDetail(orderDetail:OrderDetail):Observable<OrderDetail>{
    return this.http.post<OrderDetail>(this.url+"orderDetail.json",orderDetail);
  }
  deleteOrderDetail(id:string){
    this.http.delete(this.url+"orderDetail/"+id+".json").subscribe(()=>console.log("delete"));
  }
  updateOrderDetail(id:string,ordDet:OrderDetail):Observable<OrderDetail>{
    return this.http.put<OrderDetail>(this.url+"orderDetail/"+id+".json",ordDet);
  }
}
