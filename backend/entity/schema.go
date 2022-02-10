package entity

import (
	"fmt"
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

	Device      string    `valid:"stringlength(1|100)~Device cannot be blank and less than 100 characters,required~Device cannot be blank and less than 100 characters"`
	Lifetime    int       `valid:"ispositive~Lifetime must be positive,required~Lifetime must be positive"`
	Issue       string    `valid:"stringlength(1|200)~Issue cannot be blank and less than 200 characters,required~Issue cannot be blank and less than 200 characters"`
	RequestDate time.Time `valid:"past~RequestDate must be in the past"`

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
	WorkCode     string    `gorm:"uniqueIndex" valid:"matches(^[W]\\d{4}$)~WorkCode: does not validate as matches(^[W]\\d{4}$),required"`
	FinishedDate time.Time `valid:"future~FinishedDate must be in the future,required"`
	Wages        float32   `valid:"wages~Wages must between 100.00 and 10000.00,required"`

	EmployeeID *uint
	Employee   Employee `gorm:"references:id"`

	WorkPlaceID *uint
	WorkPlace   WorkPlace `gorm:"references:id"`

	RepairRequestID *uint `gorm:"uniqueIndex"`
	RepairRequest   RepairRequest

	RecieptHistories []RecieptHistory `gorm:"foreignKey:WorkReceiveID"`
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
	RecieptCode  string    `valid:"matches(^[R]\\d{4}$)"`
	RecieptPrice float32   `valid:"positiveFloat~RecieptPrice must be >= 0"`
	RecieptDate  time.Time `valid:"pastandpresent~RecieptDate must be in the pastandpresent"`

	EmployeeID *uint
	Employee   Employee `valid:"-"`

	WorkReceiveID *uint       `gorm:"uniqueIndex" `
	WorkReceive   WorkReceive `gorm:"references:id" valid:"-"`

	PaidByID *uint
	PaidBy   PaidBy `gorm:"references:id" valid:"-"`
}

type PurchasingCompany struct {
	gorm.Model
	Name           string
	PartsPurchases []PartsPurchase `gorm:"foreignKey:ShoppingID"`
}

type PartsPurchase struct {
	gorm.Model
	Parts        string    `valid:"required~parts cannot be blank"`
	Quantity     int       `valid:"positiveUint~Quantity must be integer more then 0,required~Quantity must be integer more then 0"`
	PartsPrice   float32   `valid:"positiveFloat~Price must be float more then 0,required~Price must be float more then 0"`
	PurchaseTime time.Time `valid:"past~PurchaseTime must not be in the future"`
	//ความสัมพันธ์กับ PurchasingCompany, Workreceive, Employee
	ShoppingID *uint
	Shopping   PurchasingCompany `gorm:"references:id" valid:"-"`

	WorkReceiveID *uint
	WorkReceive   WorkReceive `gorm:"references:id" valid:"-"`

	EditorID *uint
	Editor   Employee `gorm:"references:id" valid:"-"`
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
	Problem   string `valid:"stringlength(5|50)~Problem must be longer than 5 characters"`
	Solution  string `valid:"stringlength(5|50)~Solution must be longer than 5 characters"`
	Success   *bool
	Timestamp time.Time `valid:"timelength~Timestamp must be in present"`

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
	govalidator.CustomTypeTagMap.Set("timelength", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		g1 := t.Add(24 * time.Hour)
		g2 := t.Add(-24 * time.Hour)
		g3 := time.Now()
		return g3.Before(g1) && g3.After(g2)

	})

	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("positiveUint", func(i interface{}, context interface{}) bool {
		switch v := i.(type) { // this validates a field against the value in another field, i.e. dependent validation
		case int:
			return v >= 1
		}
		return false
	})
	govalidator.CustomTypeTagMap.Set("positiveFloat", func(i interface{}, context interface{}) bool {
		switch v := i.(type) { // this validates a field against the value in another field, i.e. dependent validation
		case float32:
			return v > 0
		}
		return false
	})

	govalidator.CustomTypeTagMap.Set("wages", func(i interface{}, context interface{}) bool {
		w := i.(float32)
		return govalidator.InRangeFloat32(w, 100.00, 10000.00)
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		tt := t.Add(7 * time.Hour)
		t2 := time.Now()
		return !(tt.Before(t2))
	})
	govalidator.CustomTypeTagMap.Set("ispositive", func(i interface{}, context interface{}) bool {
		return i.(int) > 0
	})
	govalidator.CustomTypeTagMap.Set("pastandpresent", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

}

func CheckNullBool(t *bool) (bool, error) {
	if t == nil {
		return false, fmt.Errorf("Success cannot be blank")
	} else {
		return true, nil
	}
}
