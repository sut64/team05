package entity

import (
	"time"

	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	Name string
	// 1 employee can create many Workrecive
	Workrecives []Workrecive `gorm:"foreignkey:WorkreciveID`
	// 1 employee can create many RecieptHistory
	RecieptHistories []RecieptHistory `gorm:"foreignkey:RecieptHistoryID`
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
