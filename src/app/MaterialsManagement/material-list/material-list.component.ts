import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialService } from '../material.service';
import { Material } from '../material';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/Category/category.service';
import { MaterialDTO } from '../materialDTO';
import { map, pipe } from 'rxjs';
import { ChangeData } from 'src/app/Orders/changeData';
import { OrderDetailDTO } from 'src/app/Orders/order-detaisDTO';
import { OrderDetailsService } from 'src/app/Orders/order-details.service';
@Component({
  selector: 'material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit{
  materials:MaterialDTO[]=[];
  model:MaterialDTO[];
  data:ChangeData=new ChangeData();
  loading:boolean=false;
  error:string;
  
  @Input() changeData:ChangeData=new ChangeData();
  
  @Output() selectEvent=new EventEmitter<ChangeData>();
  
  constructor(
    private route:ActivatedRoute,
    private materialService:MaterialService,
    private categoryService:CategoryService,
    private orderDetailService:OrderDetailsService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.loading=true;
      const ids:string[]=[];
      for(const ordDet of this.changeData.orderDetails){
        ids.push(ordDet.materialId)
        console.log(ids);
      }
      this.materialService.getProducts(ids).subscribe(data=>{
        this.materials=data;
        console.log(data);
        this.loading=false;
      })
    })
  }

  selectMaterial(item:MaterialDTO){
    let orderDetail:OrderDetailDTO=new OrderDetailDTO();
    orderDetail.materialId=item?.id;
    orderDetail.materiaCode=item.code;
    orderDetail.materialName=item.name;
    orderDetail.materialPrice=item.price;
    orderDetail.insert=true;
    this.changeData.orderDetails.push(orderDetail)
    this.changeData.isShowedMaterialList=false;
    //this.selectEvent.emit(this.changeData);
  }
  deleteMaterial(item:MaterialDTO){
    this.orderDetailService.getOrderDetails().subscribe(data=>{
      const orderDetail=data.find(p=>item.id==p.materialId);
      
      if(orderDetail){
        this.error="Bu malzeme "+orderDetail.orderId+" kodlu siparişte kullanılmıştır, silinemez!"
      }
      else{
        this.materialService.deleteMaterial(item.id);
        this.error="Kayıt Silindi."
      }
    })
  }
  
}
