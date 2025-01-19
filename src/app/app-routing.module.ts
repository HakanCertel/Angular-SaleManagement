import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './MaterialsManagement/material/material.component';
import { CategoryComponent } from './Category/category/category.component';
import { MaterialListComponent } from './MaterialsManagement/material-list/material-list.component';
import { CustomerComponent } from './Customer/customer/customer.component';
import { CustomerListComponent } from './Customer/customer-list/customer-list.component';
import { OrderComponent } from './Orders/order/order.component';
import { OrderListComponent } from './Orders/order-list/order-list.component';

const routes: Routes = [
  {path:"materialcreate/:materialId", component:MaterialComponent},
  {path:"materialcreate", component:MaterialComponent},
  {path: "category" , component:CategoryComponent},
  {path:"material-list" , component:MaterialListComponent},
  {path:"customer/:customerId", component:CustomerComponent},
  {path:"customer", component:CustomerComponent},
  {path:"customer-list",component:CustomerListComponent},
  {path:"order/:orderId", component:OrderComponent},
  {path:"order" , component:OrderComponent},
  {path:"order-list", component:OrderListComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
