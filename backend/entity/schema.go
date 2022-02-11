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
	Customer   Customer `gorm:"references:id" valid:"-"`

	RepairTypeID *uint
	RepairType   RepairType `gorm:"references:id" valid:"-"`

	UrgencyID *uint
	Urgency   Urgency `gorm:"references:id" valid:"-"`

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
	WorkCode     string    `gorm:"uniqueIndex" valid:"matches(^[W]\\d{4}$)~WorkCode: does not validate as matches(^[W]\\d{4}$),required~WorkCode: does not validate as matches(^[W]\\d{4}$)"`
	FinishedDate time.Time `valid:"wr_future~FinishedDate must be in the future,required~wr_future~FinishedDate must be in the future"`
	Wages        float32   `valid:"wages~Wages must between 100.00 and 10000.00,required~Wages must between 100.00 and 10000.00"`

	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

	WorkPlaceID *uint
	WorkPlace   WorkPlace `gorm:"references:id" valid:"-"`

	RepairRequestID *uint         `gorm:"uniqueIndex"`
	RepairRequest   RepairRequest `valid:"-"`

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
	//validation
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

	RepairRequestID *uint         `gorm:"uniqueIndex" valid:"-"`
	RepairRequest   RepairRequest `gorm:"references:ID" valid:"-"`
	EditorID        *uint
	Editor          Employee `gorm:"references:ID" valid:"-"`
	DifficultyID    *uint
	Difficulty      Difficulty `gorm:"references:ID" valid:"-"`
}

// ohm
type Warrantee struct {
	gorm.Model
	ID_Warrantee   string    `gorm:"uniqueIndex"`
	EndOfWarrantee time.Time `valid:"future~End of Warrantee must be in the future"`
	WarrantyPart   string    `valid:"required~Warrantee Part cannot be blank, noonlyspace~Warrantee Part must not caontain only space"`
	MaximumAmount  float32   `sql:"type:decimal(10,2);" valid:"nonnegative~Maximum Amount cannot be negative number, required~Maximum Amount must not be blank"`

	// WorkReceiveID is foreignkey
	WorkReceiveID *uint       `gorm:"uniqueIndex"`
	WorkReceive   WorkReceive `gorm:"references:ID" valid:"-"`

	// EmployeeID is foreignkey
	EmployeeID *uint
	Employee   Employee `gorm:"references:ID" valid:"-"`

	// WarranteeTypeID is foreignkey
	WarranteeTypeID *uint
	WarranteeType   WarranteeType `gorm:"references:ID" valid:"-"`
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

	govalidator.CustomTypeTagMap.Set("wr_future", func(i interface{}, context interface{}) bool {

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

	// ohm
	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("nonnegative", func(i interface{}, context interface{}) bool {
		d := i.(float32)
		return d >= 0.0
	})

	govalidator.CustomTypeTagMap.Set("noonlyspace", func(i interface{}, context interface{}) bool {
		s := i.(string)
		len := len(s)
		countSpace := 0
		for i := 0; i < len; i++ {
			if string(s[i]) == " " {
				countSpace++
			}
		}
		return countSpace != len
	})
	// ohm
}

func CheckNullBool(t *bool) (bool, error) {
	if t == nil {
		return false, fmt.Errorf("Success cannot be blank")
	} else {
		return true, nil
	}
}
