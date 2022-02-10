package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ข้อมูลถูกต้องทุก field
func TestWarranteePass(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(24 * time.Hour),
		WarrantyPart:   "ram, power supply",
		MaximumAmount:  2530.50,
	}

	// ตรวจสอบด้วย govalidator ที่เป็น ValidateStruct
	ok, err := govalidator.ValidateStruct(warrantee)

	// คาดหวังค่า ok ต้องเป็น true (มัน ok)
	g.Expect(ok).To(BeTrue())

	// คาดหวังค่า err ต้องเป็นค่า nil (ค่า error ว่าง คือ ไม่มี error)
	g.Expect(err).To(BeNil())
}

// WarranteePart ต้องไม่เป็น string ว่าง
func TestWarranteePartNoBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(24 * time.Hour),
		WarrantyPart:   "",
		MaximumAmount:  2530.50,
	}

	// ตรวจสอบด้วย govalidator ที่เป็น ValidateStruct
	ok, err := govalidator.ValidateStruct(warrantee)

	// คาดหวังค่า ok ต้องไม่เป็น true (มันไม่ ok)
	g.Expect(ok).ToNot(BeTrue())

	// คาดหวังค่า ok ต้องไม่เป็น true (ค่า error ไม่ว่าง คือ มี error)
	g.Expect(err).ToNot(BeNil())

	// คาดหวังให้ error message ต้องเป็นแบบที่กำหนดไว้
	g.Expect(err.Error()).To(Equal("Warrantee Part cannot be blank"))
}

// MaximumAmount ต้องไม่เป็นค่าติดลบ
func TestMaximumAmountNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(24 * time.Hour),
		WarrantyPart:   "ram, power supply",
		MaximumAmount:  -2530.50,
	}

	ok, err := govalidator.ValidateStruct(warrantee)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Maximum Amount cannot be negative number"))
}

// EndOfWarrantee ต้องไม่เป็นเวลาในอดีต
func TestEndOfWarranteeMustBeInTheFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(-24 * time.Hour),
		WarrantyPart:   "ram, power supply",
		MaximumAmount:  2530.50,
	}

	ok, err := govalidator.ValidateStruct(warrantee)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("End of Warrantee must be in the future"))
}

// <เพิ่ม> WarranteePart มีแค่ space อย่างเดียว
func TestWarranteePartMustNotContainOnlySpace(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(24 * time.Hour),
		WarrantyPart:   "     ",
		MaximumAmount:  2530.50,
	}

	ok, err := govalidator.ValidateStruct(warrantee)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Warrantee Part must not caontain only space"))
}

// <เพิ่ม> MaximumAmount ต้องไม่เป็น 0
func TestMaximumAmountMustNotBeZero(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(24 * time.Hour),
		WarrantyPart:   "ram, power supply",
		MaximumAmount:  0,
	}

	ok, err := govalidator.ValidateStruct(warrantee)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Maximum Amount must not be zero"))
}
