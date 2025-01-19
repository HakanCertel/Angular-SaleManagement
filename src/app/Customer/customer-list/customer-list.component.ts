import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { Customer } from '../customer';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  
  loading:boolean=false;
  customers:Customer[]=[];

  constructor(
    private customerService:CustomerService,
    private router:Router
  ){ }
  ngOnInit(): void {
    this.loading=true;
    this.customerService.getCustomers().subscribe(data=>{
      this.customers=data;
      this.loading=false;
    })
  }
  deleteCustomer(id:string){
    console.log(id)
    this.customerService.deleteCustomer(id);
  }
}
