package entity

import (
	"time"

	"gorm.io/gorm"
)

type Customer struct {
	gorm.Model
	Name           string
	ID_Customer    string `gorm:"uniqueIndex"`
	Password       string
	RepairRequests []RepairRequest `gorm:"foreignKey:CustomerID"`
}
type RepairType struct {
	gorm.Model
	Name           string
	RepairRequests []RepairRequest `gorm:"foreignKey:CustomerID"`
}
type Urgency struct {
	gorm.Model
	Name           string
	RepairRequests []RepairRequest `gorm:"foreignKey:CustomerID"`
}
type RepairRequest struct {
	gorm.Model

	Device      string
	lifetime    uint
	issue       string
	RequestDate time.Time

	CustomerID *uint
	Customer   Customer `gorm:"references:id"`

	RepairTypeID *uint
	RepairType   RepairType `gorm:"references:id"`

	UrgencyID *uint
	Urgency   Urgency `gorm:"references:id"`

	RepairRequstID *uint
	RepairRequest  []RepairRequest `gorm:"references:id"`
}

type Workrecive struct {
	gorm.Model
	WorkCode     string
	Detail       string
	Wages        float32
	FinishedDate time.Time

	EmployeeID       *uint
	Employee         Employee
	RecieptHistories []RecieptHistory `gorm:"foreignkey:RecieptHistoryID`
}

type PaidBy struct {
	gorm.Model
	Name             string
	RecieptHistories []RecieptHistory `gorm:"foreignkey:RecieptHistoryID`
}

type RecieptHistory struct {
	gorm.Model
	RecipetID    string
	RecieptPrice uint
	RecieptDate  time.Time

	EmployeeID   *uint
	Employee     Employee
	WorkreciveID *uint
	Workrecive   Workrecive
	PaidByID     *uint
	PaidBy       PaidBy
}
