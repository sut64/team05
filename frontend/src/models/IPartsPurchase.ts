import { EmployeeInterface } from "./IEmployee";
import { WorkReceiveInterface } from "./IWorkReceive";
import { PurchasingCompanyInterface }  from "./IPurchasingCompany"

export interface PartsPurchaseInterface {
    ID: number,
    Parts: string,
    Quantity: number,
    PartsPrice: number,
    PurchaseTime: Date,

    ShoppingID: number,
    Shopping: PurchasingCompanyInterface,

    WorkReceiveID: number,
    WorkReceive: WorkReceiveInterface,

    EditorID: number,
    Editor: EmployeeInterface,

   }