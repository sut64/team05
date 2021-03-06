package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST /RecieptHistory
func CreateRecieptHistory(c *gin.Context) {
	var employee entity.Employee
	var workreceive entity.WorkReceive
	var paidby entity.PaidBy
	var reciepthistory entity.RecieptHistory

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร reciepthistory
	if err := c.ShouldBindJSON(&reciepthistory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", reciepthistory.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// 11: ค้นหา workreceive ด้วย id
	if tx := entity.DB().Where("id = ?", reciepthistory.WorkReceiveID).First(&workreceive); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workrecive not found"})
		return
	}

	// 12: ค้นหา paidby ด้วย id
	if tx := entity.DB().Where("id = ?", reciepthistory.PaidByID).First(&paidby); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "paidby not found"})
		return
	}

	// 13: สร้าง RecieptHistory
	RH := entity.RecieptHistory{
		Employee:     employee,
		WorkReceive:  workreceive,
		PaidBy:       paidby,
		RecieptCode:  reciepthistory.RecieptCode,
		RecieptPrice: reciepthistory.RecieptPrice,
		RecieptDate:  reciepthistory.RecieptDate,
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(RH); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 14: บันทึก
	if err := entity.DB().Create(&RH).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": RH})
}

// GET /RecieptHistory/:id
func GetRecieptHistory(c *gin.Context) {
	var reciepthistory entity.RecieptHistory
	id := c.Param("id")
	if err := entity.DB().Preload("Employee").Preload("WorkReceive").Preload("PaidBy").Raw("SELECT * FROM reciept_histories WHERE id = ?", id).Find(&reciepthistory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reciepthistory})
}

// GET /RecieptHistory
func ListRecieptHistorys(c *gin.Context) {
	var reciepthistorys []entity.RecieptHistory
	if err := entity.DB().Preload("Employee").Preload("WorkReceive").Preload("PaidBy").Raw("SELECT * FROM reciept_histories").Find(&reciepthistorys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reciepthistorys})
}

// DELETE /users/:id

func DeleteRecieptHistory(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM reciept_histories WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "reciepthistory not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
