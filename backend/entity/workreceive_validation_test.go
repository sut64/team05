package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestWorkRecivePass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	work := WorkReceive{
		FinishedDate: time.Now(),
		Wages:        120.00,
		WorkCode:     "W1234",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(work)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestWorkRiciveWagesInRange(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []float32{
		100000.00,
		50.00,
		-20.00,
		0,
	}
	for _, fixture := range fixtures {
		work := WorkReceive{
			FinishedDate: time.Now().AddDate(0, 0, 1),
			Wages:        fixture,
			WorkCode:     "W1234",
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(work)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Wages must between 100.00 and 10000.00"))
	}

}

func TestWorkRiceiveDateNotinPast(t *testing.T) {
	g := NewGomegaWithT(t)

	work := WorkReceive{
		FinishedDate: time.Now().AddDate(0, 0, -1),
		Wages:        150.50,
		WorkCode:     "W1234",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(work)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("FinishedDate must be in the future"))
}

func TestWorkRiceiveWorkCodeMatchFormat(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"W123",
		"W12345",
		"A1234",
		"WABCฏ",
		"W123B",
		"12345",
	}
	for _, fixture := range fixtures {
		work := WorkReceive{
			FinishedDate: time.Now().AddDate(0, 0, 1),
			Wages:        150.50,
			WorkCode:     fixture,
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(work)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("WorkCode: does not validate as matches(^[W]\\d{4}$)"))
	}

}
