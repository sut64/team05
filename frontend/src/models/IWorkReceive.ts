import { EmployeeInterface } from "./IEmployee";
import { RepairRequestsInterface } from "./IRepairRequest";
import { WorkplaceInterface } from "./IWorkplace";

export interface WorkReceiveInterface {
    ID: number,
    FinishedDate: Date,
    Wages: number,
    WorkCode: string,

    EmployeeID: number,
    Employee: EmployeeInterface,

    WorkPlaceID: number,
    WorkPlace: WorkplaceInterface,

    RepairRequestID: number,
    RepairRequest: RepairRequestsInterface,

   }
   