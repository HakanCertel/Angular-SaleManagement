import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(
    private categoryService:CategoryService,
    private router:Router
  ){}

  ngOnInit(): void {    
  }
  
  saveCategory(name:any,code:any){
    this.categoryService.createCategory({id:0,code:code.value,name:name.value}).subscribe(data=>{
      this.router.navigate(['/materialcreate']);
    })
  }
}
