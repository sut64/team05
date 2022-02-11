package entity

import (
	// "fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestRepairHistoryPass(t *testing.T) {
	g := NewGomegaWithT(t)
	v := true
	//ข้อมูลต้องถูกหมดทุก field
	repairHistory := RepairHistory{
		Problem:   "monitor จอเสีย",
		Solution:  "ทำการเบิก monitor เพื่อซ่อม",
		Success:   &v,
		Timestamp: time.Now(),
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(repairHistory)

	//ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	//err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())

}

//ตรวจสอบค่าความยาวของ string Problem ถ้าต่ำกว่า 5 อักษร หรือเป็นค่าว่าง ต้องเจอ Error
func TestProblemLength(t *testing.T) {

	g := NewGomegaWithT(t)
	v := true

	fixtures := []string{
		" ",
		"ทำก",
		"dsss",
	}

	//ข้อมูลต้องถูกหมดทุก field
	for _, fixture := range fixtures {
		repairHistory := RepairHistory{
			Problem:   fixture, //ผิด
			Solution:  "ทำการเบิก monitor เพื่อซ่อม",
			Success:   &v,
			Timestamp: time.Now(),
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(repairHistory)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		//err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		//err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Problem must be longer than 5 characters"))

	}

}

//ตรวจสอบค่าความยาวของ string Solution ถ้าต่ำกว่า 5 อักษรต้องเจอ Error
func TestSolutionLength(t *testing.T) {
	g := NewGomegaWithT(t)
	v := false

	fixtures := []string{

		"ทำก",
		"dsde",
		"ซ่อม",
	}

	//ข้อมูลต้องถูกหมดทุก field
	for _, fixture := range fixtures {
		repairHistory := RepairHistory{
			Problem:   "ก็ซ่อมๆไปเหอะหน่าแหม่ซีเรียสจริงๆเร้ยย",
			Solution:  fixture, //ผิด
			Success:   &v,
			Timestamp: time.Now(),
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(repairHistory)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		//err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		//err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Solution must be longer than 5 characters"))

	}
}

//ตรวจสอบค่าความสำเร็จงานซ่อม Success ต้องไม่เป็นค่าว่าง
func TestSuccessNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	repairHistory := RepairHistory{
		Problem:   "monitor จอเสีย",
		Solution:  "ทำการเบิก monitor เพื่อซ่อม",
		Success:   nil, //ผิด
		Timestamp: time.Now(),
	}

	//ตรวจสอบด้วย govalidator
	ok, err := CheckNullBool(repairHistory.Success)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	//err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	//err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Success cannot be blank"))

}

//ตรวจสอบวันที่และเวลา ต้องไม่เป็นค่าอนาคต และอดีต ภายใน 30 นาที
func TestDateMustBeValid(t *testing.T) {
	g := NewGomegaWithT(t)
	v := true

	fixtures := []time.Time{
		((time.Now()).Add(36 * time.Hour)),
		((time.Now()).Add(25 * time.Hour)),
		((time.Now()).Add(-25 * time.Hour)),
		((time.Now()).Add(-36 * time.Hour)),
		time.Date(2024, 02, 02, 17, 7, 00, 000, time.UTC),
	}

	//ข้อมูลต้องถูกหมดทุก field
	for _, fixture := range fixtures {
		repairHistory := RepairHistory{
			Problem:   "monitor จอเสีย",
			Solution:  "ทำการเบิก monitor เพื่อซ่อม",
			Success:   &v,
			Timestamp: fixture, //ผิด

		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(repairHistory)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		//err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		//err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Timestamp must be in present"))
	}
}
