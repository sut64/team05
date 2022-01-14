package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-64.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Employee{},
		&Workrecive{},
		&PaidBy{},
		&RecieptHistory{},
	)

	db = database

	Employee1 := Employee{
		Name: "bankkee",
	}
	db.Model(&Employee{}).Create(&Employee1)

	Employee2 := Employee{
		Name: "bang",
	}
	db.Model(&Employee{}).Create(&Employee2)

	var em1 Employee
	var em2 Employee
	db.Raw("Select * from employees where name = ?", "bankkee").Scan((&em1))
	db.Raw("Select * from employees where name = ?", "bang").Scan((&em2))

	work1 := Workrecive{
		WorkCode:     "B6217082",
		Detail:       "กระจกแตกพังยับเยิน",
		Wages:        50,
		FinishedDate: time.Now(),
		Employee:     Employee1,
	}
	db.Model(&Workrecive{}).Create(&work1)

	work2 := Workrecive{
		WorkCode:     "b621000",
		Detail:       "ไม่ทราบสาเหตุที่แน่นอน",
		Wages:        100,
		FinishedDate: time.Now(),
		Employee:     Employee2,
	}
	db.Model(&Workrecive{}).Create(&work2)

	pay1 := PaidBy{
		Name: "banking",
	}
	db.Model(&PaidBy{}).Create(&pay1)

	pay2 := PaidBy{
		Name: "prompay",
	}
	db.Model(&PaidBy{}).Create(&pay2)

	reciept1 := RecieptHistory{
		RecipetID:    "R6217082",
		RecieptPrice: 1000,
		RecieptDate:  time.Now(),
		Employee:     Employee1,
		Workrecive:   work1,
		PaidBy:       pay1,
	}
	db.Model(&RecieptHistory{}).Create(&reciept1)

	reciept2 := RecieptHistory{
		RecipetID:    "R620000",
		RecieptPrice: 5000,
		RecieptDate:  time.Now(),
		Employee:     Employee2,
		Workrecive:   work2,
		PaidBy:       pay2,
	}
	db.Model(&RecieptHistory{}).Create(&reciept2)
}
