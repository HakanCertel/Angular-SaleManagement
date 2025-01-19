import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialComponent } from './MaterialsManagement/material/material.component';
import { CategoryComponent } from './Category/category/category.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './NavBar/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialListComponent } from './MaterialsManagement/material-list/material-list.component';
import { CustomerComponent } from './Customer/customer/customer.component';
import { CustomerListComponent } from './Customer/customer-list/customer-list.component';
import { OrderComponent } from './Orders/order/order.component';
import { OrderListComponent } from './Orders/order-list/order-list.component';
import { OrderDetailsComponent } from './Orders/order-details/order-details.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar/nav-sidebar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialComponent,
    NavbarComponent,
    CategoryComponent,
    MaterialListComponent,
    CustomerComponent,
    CustomerListComponent,
    OrderComponent,
    OrderListComponent,
    OrderDetailsComponent,
    NavSidebarComponent,
    SidenavComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
