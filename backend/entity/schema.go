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
	RepairRequests []RepairRequest `gorm:"foreignKey:RepairTypeID"`
}
type Urgency struct {
	gorm.Model
	Name           string
	RepairRequests []RepairRequest `gorm:"foreignKey:UrgencyID"`
}
type RepairRequest struct {
	gorm.Model

	Device      string
	Lifetime    uint
	Issue       string
	RequestDate time.Time

	CustomerID *uint
	Customer   Customer `gorm:"references:id"`

	RepairTypeID *uint
	RepairType   RepairType `gorm:"references:id"`

	UrgencyID *uint
	Urgency   Urgency `gorm:"references:id"`

	//1 editor can be in many repairHistories
	RepairHistory []RepairHistory `gorm:"foreignKey:EditorID"`

	//RepairRequstID *uint
	//RepairRequest  []RepairRequest `gorm:"references:id"`

	WorkRecives []WorkRecive `gorm:"foreignKey:RepairRequestID"`
}



//bank
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
=======
	PaidBy       PaidBy `gorm:"references:id"`
}

type PurchasingCompany struct {
	gorm.Model
	Name           string
	PartsPurchases []PartsPurchase `gorm:"foreignKey:ShoppingID"`
}

type PartsPurchase struct {
	gorm.Model
	Parts        string
	Quantity     uint
	PartsPrice   float32
	PurchaseTime time.Time
	//ความสัมพันธ์กับ PurchasingCompany, Workrecive, Employee
	ShoppingID *uint
	Shopping   PurchasingCompany `gorm:"references:id"`

	WorkreciveID *uint
	Workrecive   WorkRecive `gorm:"references:id"`

	EditorID *uint
	Editor   Employee `gorm:"references:id"`
}

type Difficulty struct {
	gorm.Model
	Name string

	//1 difficulty can be in many repairHistories
	//edit to commit again
	RepairHistory []RepairHistory `gorm:"foreignKey:DifficultyID"`
}

type RepairHistory struct {
	gorm.Model
	Problem   string
	Solution  string
	Success   bool
	Timestamp time.Time

	RepairRequestID *uint
	RepairRequest   RepairRequest `gorm:"references:ID"`
	EditorID        *uint
	Editor          Employee `gorm:"references:ID"`
	DifficultyID    *uint
	Difficulty      Difficulty `gorm:"references:ID"`
}

// ohm
type Warrantee struct {
	gorm.Model
	ID_Warrantee   string `gorm:"uniqueIndex"`
	EndOfWarrantee time.Time
	WarrantyPart   string
	MaximumAmount  float32 `sql:"type:decimal(10,2);"`

	// WorkReciveID is foreignkey
	WorkReciveID *uint
	WorkRecive   WorkRecive `gorm:"references:ID"`

	// EmployeeID is foreignkey
	EmployeeID *uint
	Employee   Employee `gorm:"references:ID"`

	// WarranteeTypeID is foreignkey
	WarranteeTypeID *uint
	WarranteeType   WarranteeType `gorm:"references:ID"`
}

type WarranteeType struct {
	gorm.Model
	Description string

	// 1 Warrantee can have many WarranteeType
	Warrrantee []Warrantee `gorm:"foreignKey:WarranteeTypeID"`
}

// ohm

