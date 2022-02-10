package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPurchasePass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	purchase := PartsPurchase{
		Parts: "asd", 
		Quantity: 2,
		PartsPrice: 321.12,
		PurchaseTime: time.Date(2022,1,1,12,00,00,000,time.UTC),
	}

	ok, err := govalidator.ValidateStruct(purchase)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())

}

func TestPurchasePartsNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	purchase := PartsPurchase{
		Parts: "", //ผิด
		Quantity: 2,
		PartsPrice: 321.12,
		PurchaseTime: time.Date(2022,1,1,12,00,00,000,time.UTC),
	}

	ok, err := govalidator.ValidateStruct(purchase)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).ToNot(BeNil())
	
	g.Expect(err.Error()).To(Equal("parts cannot be blank"))
}

func TestPurchaseQuantity(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []int{
		0,
		-12,
	}

	for _, fixture := range fixtures {
		purchase := PartsPurchase{
			Parts: "fwe", 
			Quantity: fixture, //ผิด
			PartsPrice: 321.12,
			PurchaseTime: time.Date(2022,1,1,12,00,00,000,time.UTC),
		}
	
		ok, err := govalidator.ValidateStruct(purchase)
	
		// ok ต้องเป็น true แปลว่าไม่มี error
		g.Expect(ok).ToNot(BeTrue())
	
		// err เป็นค่า nil แปลว่าไม่มี error
		g.Expect(err).ToNot(BeNil())
		
		g.Expect(err.Error()).To(Equal("Quantity must be integer more then 0"))
	}
}

func TestPurchasePrice(t *testing.T) {
	g := NewGomegaWithT(t)
	
	fixtures := []float32{
		0,
		-123.23,
	}

	for _, fixture := range fixtures {
		purchase := PartsPurchase{
			Parts: "fwe", 
			Quantity: 1, 
			PartsPrice: fixture, //ผิด
			PurchaseTime: time.Date(2022,1,1,12,00,00,000,time.UTC),
		}
	
		ok, err := govalidator.ValidateStruct(purchase)
	
		// ok ต้องเป็น true แปลว่าไม่มี error
		g.Expect(ok).ToNot(BeTrue())
	
		// err เป็นค่า nil แปลว่าไม่มี error
		g.Expect(err).ToNot(BeNil())
		
		g.Expect(err.Error()).To(Equal("Price must be float more then 0"))
	}
}

func TestPurchaseTimePurchase(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	purchase := PartsPurchase{
		Parts: "fwe", 
		Quantity: 2, 
		PartsPrice: 321.12,
		PurchaseTime: time.Date(2022,2,20,12,00,00,000,time.UTC),//ผิด
	}

	ok, err := govalidator.ValidateStruct(purchase)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).ToNot(BeNil())
	
	g.Expect(err.Error()).To(Equal("PurchaseTime must not be in the future"))
}