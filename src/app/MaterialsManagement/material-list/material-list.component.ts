import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialService } from '../material.service';
import { Material } from '../material';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/Category/category.service';
import { MaterialDTO } from '../materialDTO';
import { map, pipe } from 'rxjs';
import { ChangeData } from 'src/app/Orders/changeData';
import { OrderDetailDTO } from 'src/app/Orders/order-detaisDTO';
@Component({
  selector: 'material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit{
  loading:boolean=false;
  materials:MaterialDTO[]=[];
  model:MaterialDTO[];
  data:ChangeData=new ChangeData();
  
  @Input() changeData:ChangeData=new ChangeData();
  
  @Output() selectEvent=new EventEmitter<ChangeData>();
  
  constructor(
    private materialService:MaterialService,
    private route:ActivatedRoute,
    private categoryService:CategoryService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.loading=true;

      this.materialService.getProducts().subscribe(data=>{
        this.materials=data;
        console.log(data);
        this.loading=false;
      })
    })
  }

  selectMaterial(item:MaterialDTO){
    let orderDetail:OrderDetailDTO=new OrderDetailDTO();
    orderDetail.materialId=item.id;
    orderDetail.materiaCode=item.code;
    orderDetail.materialName=item.name;
    orderDetail.materialPrice=item.price;
    orderDetail.insert=true;
    this.changeData.orderDetails.push(orderDetail)
    this.changeData.isShowedMaterialList=false;
    //this.selectEvent.emit(this.changeData);
  }
  
}
