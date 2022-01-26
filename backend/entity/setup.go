package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("ReciptHistory.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Employee{},
		&WorkRecive{},
		&PaidBy{},
		&RecieptHistory{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("252533"), 14)

	Employee1 := Employee{
		Name:        "bankkee",
		Age:         18,
		Email:       "eoozassqq@hotmail.com",
		PhoneNumber: "0635166895",
		Password:    string(password),
	}
	db.Model(&Employee{}).Create(&Employee1)

	Employee2 := Employee{
		Name:        "bang",
		Age:         22,
		Email:       "bunyarith@hotmail.com",
		PhoneNumber: "0833794989",
		Password:    string(password),
	}
	db.Model(&Employee{}).Create(&Employee2)

	var em1 Employee
	var em2 Employee
	db.Raw("Select * from employees where name = ?", "bankkee").Scan((&em1))
	db.Raw("Select * from employees where name = ?", "bang").Scan((&em2))

	work1 := WorkRecive{
		WorkCode:     "B6217082",
		Wages:        50.50,
		FinishedDate: time.Now(),
		Employee:     Employee1,
	}
	db.Model(&WorkRecive{}).Create(&work1)

	work2 := WorkRecive{
		WorkCode:     "b621000",
		Wages:        100.25,
		FinishedDate: time.Now(),
		Employee:     Employee2,
	}
	db.Model(&WorkRecive{}).Create(&work2)

	pay1 := PaidBy{
		Name: "banking",
	}
	db.Model(&PaidBy{}).Create(&pay1)

	pay2 := PaidBy{
		Name: "prompay",
	}
	db.Model(&PaidBy{}).Create(&pay2)

	reciept1 := RecieptHistory{
		RecipetCode:  "R1234",
		RecieptPrice: 1000.50,
		RecieptDate:  time.Now(),
		Employee:     Employee1,
		WorkRecive:   work1,
		PaidBy:       pay1,
	}
	db.Model(&RecieptHistory{}).Create(&reciept1)

	reciept2 := RecieptHistory{
		RecipetCode:  "R4321",
		RecieptPrice: 5000.25,
		RecieptDate:  time.Now(),
		Employee:     Employee2,
		WorkRecive:   work2,
		PaidBy:       pay2,
	}
	db.Model(&RecieptHistory{}).Create(&reciept2)
}
