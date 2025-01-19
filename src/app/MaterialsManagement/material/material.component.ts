import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/Category/category';
import { MaterialService } from '../material.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from '../material';
import { CategoryService } from 'src/app/Category/category.service';
import { MaterialDTO } from '../materialDTO';
@Component({
  selector: 'materialcreate',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  
  model:MaterialDTO=new MaterialDTO;
  error:string="";
  categories:Category[]=[];
  loading:boolean=false;
  update:boolean=false;
  constructor(
    private materialService:MaterialService,
    private categoryService:CategoryService,
    private router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(p=>{
      this.loading=true;
      this.materialService.getMaterialById(p["materialId"]).subscribe(data=>{
        if(data!=null){
          this.model=data;
          this.update=true;
        }
        this.loading=false;
      })
      this.categoryService.getCategories().subscribe(cust=>{
        this.categories=cust;
      })
    })
  }
  saveMaterial(form:NgForm){
    const material:Material={
      id:1,
      code:this.model.code,
      name:this.model.name,
      price:this.model.price,
      isActive:this.model.isActive,
      categoryId:this.model.categoryId
    }
    this.materialService.createMaterial(material).subscribe(data=>{
      this.router.navigate(['/material-list']);
      console.log(data);
    });
  }

}
