import { Material } from "../MaterialsManagement/material";
import { MaterialDTO } from "../MaterialsManagement/materialDTO";
import { OrderDetailDTO } from "./order-detaisDTO";

export class ChangeData{
    orderDetails:OrderDetailDTO[]=[];
    isShowedMaterialList:boolean=false;
}