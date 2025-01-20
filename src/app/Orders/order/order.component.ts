import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { Customer } from 'src/app/Customer/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/Customer/customer.service';
import { MaterialService } from 'src/app/MaterialsManagement/material.service';
import { OrderService } from '../order.service';
import { NgForm } from '@angular/forms';
import { ChangeData } from '../changeData';
import { OrderDetail } from '../order-details';
import { map, pipe, switchMap, tap } from 'rxjs';
import { OrderDetailDTO } from '../order-detaisDTO';
import { OrderDetailsService } from '../order-details.service';
import { MaterialDTO } from 'src/app/MaterialsManagement/materialDTO';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  model:Order=new Order();
  customers:Customer[]=[];
  material:MaterialDTO;
  changeData:ChangeData=new ChangeData();
  isShowedMaterialList:boolean=false;
  order:{orderId:string,customerId:string}={orderId:"",customerId:""};
  update:boolean=false;
  loading:boolean=false;
  error:string="";
  id:Number=0;
  
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private customerService:CustomerService,
    private materialService:MaterialService,
    private orderService:OrderService,
    private orderDetailService:OrderDetailsService,
    
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(p=>{
        this.orderService.getOrderById(p["orderId"]).subscribe(ord=>{
            if(ord!=null){
              this.changeData.orderDetails=[];
              this.model={...ord,id:p["orderId"]};
              this.order.orderId=ord.code;
              this.order.customerId=ord.customerId;
              this.update=true;
              this.getOrderDetails();
            }else{
              this.orderService.getOrders().subscribe(data=>{
                this.id=data.length;
                this.model.id=this.id;
                console.log("else");
              })
            }
        })
        this.customerService.getCustomers().subscribe(cust=>{
          this.customers=cust;
        })

    })
  }

  saveOrder(form:NgForm){
    const order:Order={
      id:this.model.id,
      code:this.model.code,
      customerId:this.model.customerId,
      orderDate:new Date(),
      deliveryDate:new Date(),
      isActive:this.model.isActive
    }
    if(!this.update) {
      this.orderService.createOrder(order).subscribe(data=>{
        this.router.navigate(["/order-list"]);
        console.log(data);
        console.log("yeni kayıt eklendi")
      })
    } else {
      this.orderService.updateOrder(order.id,order).subscribe(data=>{
        this.router.navigate(["/order-list"]);
      })
    }  
    this.saveOrderDetail();
  }

  selectData(it:ChangeData){
    //this.changeData=it;
    //console.log(this.changeData);
  }
  showMaterialList(){
    this.changeData.isShowedMaterialList=!this.changeData.isShowedMaterialList;
  }
  getOrderDetails(){
    this.orderDetailService.getOrderDetails(this.order.orderId).subscribe(data=>{
      for(const key in data){
          this.materialService.getMaterialById(data[key].materialId).subscribe(mat=>{
            const ordDet={
              id:data[key].id,
              orderId:this.order.orderId,
              orderDate:new Date(),
              customerId:this.order.customerId,
              customerName:"",
              deliveryDate:new Date(),
              materialId:data[key].materialId,
              materiaCode:mat.code,    
              materialName:mat.name,
              materialPrice:mat.price,
              quantity:data[key].quantity,
              totalPrice:0,
              isActive:true,
              insert:false,
              update:false,
              delete:false
            }
            //console.log(this._orderDetail);
            ordDet.totalPrice=ordDet.materialPrice*ordDet.quantity;
            this.changeData.orderDetails.push(ordDet)
          })
        }
      });
  }

  saveOrderDetail():void{
    for(const a of this.changeData.orderDetails){
      if(a.insert){
        const orderDetail:OrderDetail={
          id:a.id,
          orderId:this.model.code,
          materialId:a.materialId,
          quantity:a.quantity,
          isActive:true,
        }
        this.orderDetailService.createOrderDetail(orderDetail).subscribe(d=>{pipe(map(data=>{return data}))});
      }else if(a.update){
        const orderDetail:OrderDetail={
          id:a.id,
          orderId:this.model.code,
          materialId:a.materialId,
          quantity:a.quantity,
          isActive:true,
        }
        this.orderDetailService.updateOrderDetail(a.id,orderDetail).subscribe(data=>{
          console.log(data);
        });
      }
    } 
  }
}
