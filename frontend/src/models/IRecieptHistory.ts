import { EmployeeInterface } from "./IEmployee";
import { PaidBiesInterface } from "./IPaidBy";
import { WorkReceiveInterface } from "./IWorkReceive";

export interface RecieptHistorysInterface {
    ID: string,
    RecieptCode: string,
    RecieptPrice: number,
    RecieptDate: Date,
    EmployeeID : number,
    Employee: EmployeeInterface
    WorkReceiveID : number,
    WorkReceive : WorkReceiveInterface,
    PaidByID : number,
    PaidBy : PaidBiesInterface
   }
   