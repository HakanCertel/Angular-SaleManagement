import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderDetailsService } from '../order-details.service';
import { MaterialService } from 'src/app/MaterialsManagement/material.service';
import { OrderDetailDTO } from '../order-detaisDTO';
import { MaterialDTO } from 'src/app/MaterialsManagement/materialDTO';
import { Material } from 'src/app/MaterialsManagement/material';
import { ChangeData } from '../changeData';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  
  _orderDetails:OrderDetailDTO[]=[];
  _orderDetail:OrderDetailDTO;
  _material:MaterialDTO;
  id:Number=0;
  
  @Input() changeData:ChangeData;
  @Input() order:{orderId:string,customerId:string};
  @Output() selectEvent=new EventEmitter<ChangeData>();
  
  constructor(
    private orderDetailsService:OrderDetailsService,
    private materialService:MaterialService,
  ){}
  
  ngOnInit(): void {
  }
  deleteOrderDetails(orderDetail:OrderDetailDTO){
    const ordDet=this.changeData.orderDetails.findIndex(p=>p.materiaCode==orderDetail.materiaCode);
    this.changeData.orderDetails.splice(ordDet,1);
  }

}
