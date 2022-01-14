package entity

import (
	"time"

	"gorm.io/gorm"
)

type Difficulty struct {
	gorm.Model
	Name string

	//1 difficulty can be in many repairHistories
	RepairHistory []RepairHistory `gorm:"foreignKey:DifficultyID"`
}
