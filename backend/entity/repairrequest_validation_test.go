package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestRepairRequestPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	repairrequest := RepairRequest{
		Device:      "MSI",
		Lifetime:    1,
		Issue:       "DDD",
		RequestDate: time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(repairrequest)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}
func TestDeviceNotBlankAndMustLess(t *testing.T) {
	g := NewGomegaWithT(t)

	repairrequest := RepairRequest{
		Device:      "",
		Lifetime:    12,
		Issue:       "จอฟ้า",
		RequestDate: time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(repairrequest)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Device cannot be blank and less than 100 characters"))
}
func TestLifetimeMustBePositiveIntegerAndMoreZero(t *testing.T) {
	g := NewGomegaWithT(t)

	repairrequest := RepairRequest{
		Device:      "MSI",
		Lifetime:    -1,
		Issue:       "จอฟ้า",
		RequestDate: time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(repairrequest)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Lifetime must be positive"))
}
func TestIssueNotBlankAndMustLess(t *testing.T) {
	g := NewGomegaWithT(t)

	repairrequest := RepairRequest{
		Device:      "MSI",
		Lifetime:    12,
		Issue:       "",
		RequestDate: time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(repairrequest)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Issue cannot be blank and less than 200 characters"))
}
func TestRequestDateMustBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	rr := RepairRequest{
		Device:      "MSI",
		Lifetime:    12,
		Issue:       "จอฟ้า",
		RequestDate: time.Now().Add(24 * time.Hour), // อนาคต, fail
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(rr)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("RequestDate must be in the past"))
}
