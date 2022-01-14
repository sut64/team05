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

