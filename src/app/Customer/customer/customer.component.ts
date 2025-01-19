import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/Category/category';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  model:Customer=new Customer();
  id:number=0;
  error:string="";
  customers:Customer[]=[];
  loading:boolean=false;
  update:boolean=false;
  constructor(
    private customerService:CustomerService,
    private router:ActivatedRoute,
    private route:Router

  ){ }

  ngOnInit(): void {
    this.router.params.subscribe(p=>{
      this.loading=true;
      this.customerService.getCustomerbyId(p["customerId"]).subscribe(data=>{
        if(data!=null){
          this.update=true;
          this.model={...data,id:p["customerId"]};
        }else{
          this.customerService.getCustomers().subscribe(d=>{
            this.id=d.length+1;
            this.model.id=this.id;
          })
        }
        this.loading=true;
        console.log(this.model);
      })
    })
  }

  saveCustomer(form:NgForm){
    console.log(this.update);
    
    const customer:Customer={
      id:this.model.id,
      code:this.model.code,
      name:this.model.name,
      adress:this.model.adress,
      description:this.model.description,
      isActive:this.model.isActive
    }
    if(!this.update){
      this.customerService.creatCustomer(customer).subscribe(data=>{
        this.route.navigate(["/customer-list"]);
        console.log(data);
        console.log("yeni kayıt eklendi")
      })
    }else{
      this.customerService.updateCustomer(customer.id,customer).subscribe(data=>{
        console.log("data update");
        this.route.navigate(["/customer-list"]);
        console.log(data);
      })
    }
  }
}
