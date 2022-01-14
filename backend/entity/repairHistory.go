package entity

import (
	"time"

	"gorm.io/gorm"
)

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
