import { CustomersInterface } from "./ICustomer";
import { RepairTypesInterface } from "./IRepairType";
import { UrgenciesInterface } from "./IUrgency";

export interface RepairRequestsInterface {
  ID: string,
  Device      : string,
  Lifetime    : number,
  Issue       : string,
  RequestDate : Date,
  CustomerID: number,
  Customer: CustomersInterface,
  RepairTypeID: number,
  RepairType: RepairTypesInterface,
  UrgencyID: number,
  Urgency: UrgenciesInterface,
}