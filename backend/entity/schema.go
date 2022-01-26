package entity

import (
	"time"

	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	Name        string
	Age         uint
	Email       string
	Phonenumber string
	Password    string
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
	RecipetCode  string    `valid:"matches(^[R]\\d{4}$)"`
	RecieptPrice float32   `valid:"float~RecieptPrice must be >= 0"`
	RecieptDate  time.Time `valid:"notpast~RecieptDate must be in the past"`

	EmployeeID   *uint
	Employee     Employee
	WorkreciveID *uint
	Workrecive   Workrecive
	PaidByID     *uint
	PaidBy       PaidBy
}
