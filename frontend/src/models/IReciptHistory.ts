import { EmployeesInterface } from "./IEmployee";
import { PaidBiesInterface } from "./IPaidBy";
import { WorkRecivesInterface } from "./IWorkRecive";

export interface ReciptHistorysInterface {
    ID: string,
    RecipetCode: string,
    RecieptPrice: number,
    RecieptDate: Date,
    EmployeeID : number,
    Employee: EmployeesInterface
    WorkReciveID : number,
    WorkRecive : WorkRecivesInterface,
    PaidByID : number,
    PaidBy : PaidBiesInterface
   }
   