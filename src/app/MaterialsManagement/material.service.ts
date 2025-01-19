import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable ,map,tap,delay, pipe, Subject} from 'rxjs';
import { Material } from './material';
import { MaterialDTO } from './materialDTO';
import { CategoryService } from '../Category/category.service';
import { Category } from '../Category/category';
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  
  private url="https://ordermanagement-6ac53-default-rtdb.firebaseio.com/"
  materialDto:MaterialDTO[]=[];
  matDto:MaterialDTO;
  //matDtos=new Subject<MaterialDTO>();
  
  category:Category;
  
  constructor(private http:HttpClient,private categoryService:CategoryService) { }

  createMaterial(material:Material):Observable<Material>{
    return this.http.post<Material>(this.url+"material.json",material);
  }

  getMaterialById(id:string):Observable<MaterialDTO>{
    return this.http.get<MaterialDTO>(this.url+"material/"+id+".json")
  }

  getProducts(id?:number):Observable<MaterialDTO[]>{
    return this.http
      .get<MaterialDTO[]>(this.url+"material.json")
      .pipe(
        map(data=>{
            const meterials:MaterialDTO[]=[];
            
                for(const key in data)  {
                  //meterials.push({...data[key],id:key});
                  this.categoryService.getCategoryById(data[key].categoryId).subscribe(cat=>{
                  this.matDto={
                    id:key,
                    code:data[key].code,
                    name:data[key].name,
                    price:data[key].price,
                    isActive:data[key].isActive,
                    description:data[key].description,
                    categoryId:data[key].categoryId,
                    categoryName:cat.name,
                  }
                  meterials.push(this.matDto);
                })
              }
              //this.matDtos.subscribe((data)=>console.log(data));   
              
              console.log(meterials);  
            return meterials;

        })
       
      )
}
}
