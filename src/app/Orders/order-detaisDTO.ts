import { OrderDetail } from "./order-details";

export  class OrderDetailDTO{
    isActive: boolean;
    id:any;
    orderId:string;
    orderDate:Date;
    customerId:string;
    customerName:string;
    deliveryDate:Date;
    materialId:string;
    materiaCode:string;    
    materialName:string;
    materialPrice:number;
    quantity:number;
    totalPrice:number;
    insert:boolean=false;
    update:boolean=false;
    delete:boolean=false;
}