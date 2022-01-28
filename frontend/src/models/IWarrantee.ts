import { WorkReceiveInterface } from "./IWorkReceive";
import { EmployeeInterface } from "./IEmployee";
import { WarranteeTypeInterface } from "./IWarranteeType";
export interface WarranteeInterface {
    ID: number,
    ID_Warrantee: string,
    EndOfWarrantee: Date | null
    WarrantyPart: string,
    MaximumAmount: number,

    EmployeeID: number,
    Employee: EmployeeInterface,

    WorkReceiveID: number,
    WorkReceive: WorkReceiveInterface,

    WarranteeTypeID: number,
    WarranteeType: WarranteeTypeInterface
}