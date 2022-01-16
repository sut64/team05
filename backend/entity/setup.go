package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("schema.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	database.AutoMigrate(
		&Customer{},
		&RepairType{},
		&Urgency{},
		&RepairRequest{},
		&Employee{},
		&WorkPlace{},
		&WorkRecive{},
		&PaidBy{},
		&RecieptHistory{},
		&PurchasingCompany{},
		&PartsPurchase{},
		&Difficulty{},
		&RepairHistory{},
	)

	db = database
	password, err := bcrypt.GenerateFromPassword([]byte("232345"), 14)

	//Employee Data
	db.Model(&Employee{}).Create(&Employee{
		Name:        "Rinrada Wattan",
		Age:         21,
		Email:       "rinrada_lady27@outlook.com",
		Password:    string(password),
		PhoneNumber: "0985855271",
	})

	var rinrada Employee
	db.Raw("SELECT * FROM employees WHERE email = ?", "rinrada_lady27@outlook.com").Scan(&rinrada)

	//Difficulty Data
	easy := Difficulty{
		Name: "easy",
	}
	db.Model(&Difficulty{}).Create(&easy)

	average := Difficulty{
		Name: "average",
	}
	db.Model(&Difficulty{}).Create(&average)

	hard := Difficulty{
		Name: "hard",
	}
	db.Model(&Difficulty{}).Create(&hard)

	none := Difficulty{
		Name: "none",
	}
	db.Model(&Difficulty{}).Create(&none)

	/*	//RepairRequest Data
		RR001 := RepairRequest{
			Device:      "Acer Computer",
			lifetime:    3,
			issue:       "คอมพิวเตอร์เปิดไม่ติด",
			RequestDate: time.Date(2021, 12, 27, 9, 18, 00, 000, time.UTC),
		}
		db.Model(&RepairRequest{}).Create(&RR001)

		RR002 := RepairRequest{
			Device:      "Brother CPx703 Printer",
			Lifetime:    1,
			Issue:       "Printer ถ่ายเอกสาร แล้วตัวอักษรเพี้ยน",
			RequestDate: time.Date(2021, 12, 30, 15, 40, 55, 000, time.UTC),
		}
		db.Model(&RepairRequest{}).Create(&RR002)

		//RepairHistory
		db.Model(&RepairHistory{}).Create(&RepairHistory{
			Problem:       "Powersupplyเสีย ต้องเปลี่ยนทดแทนของใหม่",
			Solution:      "เบิก Powersupply เปลี่ยน 1 ตัว",
			Success:       true,
			Timestamp:     time.Date(2021, 12, 20, 17, 30, 00, 000, time.UTC),
			RepairRequest: RR001,
			Difficulty:    easy,
			Editor:        rinrada,
		})

		db.Model(&RepairHistory{}).Create(&RepairHistory{
			Problem:       "ตัวสแกนและสายแพรชำรุด",
			Solution:      "เปลี่ยนเซ็นเซอร์ใช้สแกน และเปลี่ยนสายแพรใหม่",
			Success:       true,
			Timestamp:     time.Date(2022, 01, 07, 10, 55, 37, 000, time.UTC),
			RepairRequest: RR002,
			Difficulty:    average,
			Editor:        rinrada,
		})
	*/
	workplace1 := WorkPlace{
		Name: "On site",
	}
	db.Model(&WorkPlace{}).Create(&workplace1)
	workplace2 := WorkPlace{
		Name: "Off site",
	}
	db.Model(&WorkPlace{}).Create(&workplace2)
	workplace3 := WorkPlace{
		Name: "Remote",
	}
	db.Model(&WorkPlace{}).Create(&workplace3)
	// workrecive1 := WorkRecive{
	// 	FinishedDate:   time.Now(),
	// 	Wages:          120,
	// 	WorkReciveCode: "W1234",

	// 	WorkPlace:     workplace1,
	// 	Employee:      emp1,
	// 	RepairRequest: work1,
	// }
	// db.Model(&WorkRecive{}).Create(&workrecive1)
}
