package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestWarranteePass(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(1),
		WarrantyPart:   "ram, power supply",
		MaximumAmount:  2530.50,
	}

	ok, err := govalidator.ValidateStruct(warrantee)

	g.Expect(ok).To(BeTrue())

	g.Expect(err).To(BeNil())
}

func TestWarranteePartNoBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(1),
		WarrantyPart:   "",
		MaximumAmount:  2530.50,
	}

	ok, err := govalidator.ValidateStruct(warrantee)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Warrantee Part cannot be blank"))
}

func TestMaximumAmountNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(1),
		WarrantyPart:   "ram, power supply",
		MaximumAmount:  -2530.50,
	}

	ok, err := govalidator.ValidateStruct(warrantee)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Maximum Amount cannot be negative number"))
}

func TestEndOfWarranteeMustBeInTheFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(-1),
		WarrantyPart:   "ram, power supply",
		MaximumAmount:  2530.50,
	}

	ok, err := govalidator.ValidateStruct(warrantee)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("End of Warrantee must be in the future"))
}

func TestWarranteePartMustNotContainOnlySpace(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(1),
		WarrantyPart:   "     ",
		MaximumAmount:  2530.50,
	}

	ok, err := govalidator.ValidateStruct(warrantee)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Warrantee Part must not caontain only space"))
}

func TestMaximumAmountMustNotBeZero(t *testing.T) {
	g := NewGomegaWithT(t)

	warrantee := Warrantee{
		ID_Warrantee:   "G123456",
		EndOfWarrantee: time.Now().Add(1),
		WarrantyPart:   "ram, power supply",
		MaximumAmount:  0,
	}

	ok, err := govalidator.ValidateStruct(warrantee)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Maximum Amount must not be zero"))
}

//
