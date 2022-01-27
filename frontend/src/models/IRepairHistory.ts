import { RepairRequestsInterface } from "./IRepairRequest";
import { DifficultiesInterface } from "./IDifficulty";
import { EmployeeInterface } from "./IEmployee";

export interface RepairHistoriesInterface {
    ID: number,
    Problem: string;
    Solution: string;
    Success: boolean;
    Timestamp: Date;


    RepairRequestID: number;
    RepairRequest: RepairRequestsInterface;

    DifficultyID: number;
    Difficulty: DifficultiesInterface;

    EditorID: number;
    Editor: EmployeeInterface;
}