import { Component, OnInit } from '@angular/core';
import { OrderDto } from '../orderDTO';
import { OrderService } from '../order.service';
import { CustomerService } from 'src/app/Customer/customer.service';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{
  
  orders:OrderDto[]=[];
  
  constructor(
    private orderService:OrderService,
    private customerService:CustomerService
  ){}
  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data=>{
      this.orders=data;
    })
  }    
}
