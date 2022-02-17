package entity

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestReciept_HistoryPass(t *testing.T) {
	g := NewGomegaWithT(t)

	recipt_history := RecieptHistory{
		RecieptCode:  "R6789",
		RecieptPrice: 1000.25,
		RecieptDate:  time.Now().AddDate(0, 0, -1),
	}

	ok, err := govalidator.ValidateStruct(recipt_history)

	g.Expect(ok).To(BeTrue())

	g.Expect(err).To(BeNil())

}

func TestRecieptCodeMustBeInvalidPattern(t *testing.T) {
	g := NewGomegaWithT(t)
	fixtures := []string{
		"X6789",
		"A1234",
		"B1245",

		"RA999",
		"R9A99",
		"R99A9",
		"R999A",

		"r1234",
		"rA234",
		"r1A34",
		"r12A4",
		"r123A",

		"R12345",
		"R123456",
		"R123",

		"R*123",
		"*1234",
		"/1234",
		"-A134",

		"Rr1234",
		"R-1234",
		"R!234",
		"R.1234",
		"RR1234",
		"R+1234",
		"R-1234",
		"R 1234",
	}

	for _, fixture := range fixtures {

		recipt_history := RecieptHistory{
			RecieptCode:  fixture,
			RecieptPrice: 1000.25,
			RecieptDate:  time.Now().AddDate(0, 0, -1),
		}

		ok, err := govalidator.ValidateStruct(recipt_history)

		g.Expect(ok).ToNot(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`RecieptCode: %s does not validate as matches(^[R]\d{4}$)`, fixture)))
	}
}

func TestRecieptPriceMustBePlus(t *testing.T) {
	g := NewGomegaWithT(t)

	recipt_history := RecieptHistory{
		RecieptCode:  "R6789",
		RecieptPrice: -150.25,
		RecieptDate:  time.Now().AddDate(0, 0, -1),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(recipt_history)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("RecieptPrice must be equal or greater than 0"))
}

func TestRecieptDatenotfuture(t *testing.T) {
	g := NewGomegaWithT(t)

	recipt_history := RecieptHistory{
		RecieptCode:  "R6789",
		RecieptPrice: 150.25,
		RecieptDate:  time.Now().AddDate(0, 0, 1),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(recipt_history)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("RecieptDate must be in the past and present"))

}
