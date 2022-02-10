package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Customer struct {
	gorm.Model
	Name           string
	Email          string `gorm:"uniqueIndex"`
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

	//fix 1to1
	RepairHistory *RepairHistory `gorm:"foreignKey:RepairRequestID"`

	//RepairRequstID *uint
	//RepairRequest  []RepairRequest `gorm:"references:id"`

	//fix 1to1
	WorkReceives *WorkReceive `gorm:"foreignKey:RepairRequestID"`
}

//bank
type Employee struct {
	gorm.Model
	Name        string
	Age         uint
	Email       string
	PhoneNumber string
	Password    string

	// 1 employee can create many Workreceive
	WorkReceives []WorkReceive `gorm:"foreignKey:EmployeeID"`

	// 1 employee can create many RecieptHistory
	RecieptHistories []RecieptHistory `gorm:"foreignkey:EmployeeID"`

	// (ohm) 1 employee can create many Warrantee
	Warrantee []Warrantee `gorm:"foreignkey:EmployeeID"`
}

type WorkPlace struct {
	gorm.Model
	Name         string
	WorkReceives []WorkReceive `gorm:"foreignKey:WorkPlaceID"`
}

type WorkReceive struct {
	gorm.Model
	WorkCode     string  `gorm:"uniqueIndex"`
	Wages        float32 `sql:"type:decimal(7,2);"`
	FinishedDate time.Time

	EmployeeID *uint
	Employee   Employee `gorm:"references:id"`

	WorkPlaceID *uint
	WorkPlace   WorkPlace `gorm:"references:id"`

	RepairRequestID *uint `gorm:"uniqueIndex"`
	RepairRequest   RepairRequest

	RecieptHistory *RecieptHistory `gorm:"foreignKey:WorkReceiveID"`
	// foreignkey to PartsPurchase
	PartsPurchases []PartsPurchase `gorm:"foreignKey:WorkReceiveID"`

	Warrantee *Warrantee `gorm:"foreignKey:WorkReceiveID"`
}

type PaidBy struct {
	gorm.Model
	Name             string
	RecieptHistories []RecieptHistory `gorm:"foreignkey:PaidByID"`
}

type RecieptHistory struct {
	gorm.Model
	RecieptCode  string
	RecieptPrice float32
	RecieptDate  time.Time

	EmployeeID *uint
	Employee   Employee

	WorkReceiveID *uint       `gorm:"uniqueIndex"`
	WorkReceive   WorkReceive `gorm:"references:id"`
	PaidByID      *uint
	PaidBy        PaidBy `gorm:"references:id"`
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
	//ความสัมพันธ์กับ PurchasingCompany, Workreceive, Employee
	ShoppingID *uint
	Shopping   PurchasingCompany `gorm:"references:id"`

	WorkReceiveID *uint
	WorkReceive   WorkReceive `gorm:"references:id"`

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
	Success   *bool
	Timestamp time.Time

	RepairRequestID *uint `gorm:"uniqueIndex"`
	RepairRequest   RepairRequest
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

	// WorkReceiveID is foreignkey
	WorkReceiveID *uint       `gorm:"uniqueIndex"`
	WorkReceive   WorkReceive `gorm:"references:ID"`

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

func init() {
	govalidator.CustomTypeTagMap.Set("float", func(i interface{}, o interface{}) bool {
		fl := i.(float32)
		return fl >= 0
	})
	govalidator.CustomTypeTagMap.Set("pastandpresent", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
}
