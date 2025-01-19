import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable,map } from 'rxjs';
import { Category } from './category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url="https://ordermanagement-6ac53-default-rtdb.firebaseio.com/";
  categoryy:any={};
  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.url+'categories.json')
      .pipe(
        map(data=>{
          const categories:Category[]=[];
          for(const key in data){
             categories.push({...data[key],id:key})
          }

          return categories;
        })
      )
  }
  createCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(this.url+'categories.json',category);
  }

  getCategoryById(id?:string):Observable<Category>{
    return this.http.get<Category>(this.url+"categories/"+id+".json")
  }
}
