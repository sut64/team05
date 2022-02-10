package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST /users
func CreateWorkReceive(c *gin.Context) {

	var workRecive entity.WorkReceive
	var workPlace entity.WorkPlace
	var employee entity.Employee
	var repairRequest entity.RepairRequest

	if err := c.ShouldBindJSON(&workRecive); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// : ค้นหา Employee ด้วย id
	if tx := entity.DB().Where("id = ?", workRecive.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}
	// : ค้นหา workPlace ด้วย id
	if tx := entity.DB().Where("id = ?", workRecive.WorkPlaceID).First(&workPlace); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workPlace not found"})
		return
	}

	// : ค้นหา repairRequest ด้วย id
	if tx := entity.DB().Where("id = ?", workRecive.RepairRequestID).First(&repairRequest); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairRequest not found"})
		return
	}

	// : สร้าง WorkReceive
	wr := entity.WorkReceive{
		FinishedDate: workRecive.FinishedDate,
		Wages:        workRecive.Wages,
		WorkCode:     workRecive.WorkCode,

		Employee:      employee,
		WorkPlace:     workPlace,
		RepairRequest: repairRequest,
	}
	if _, err := govalidator.ValidateStruct(wr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : บันทึก
	if err := entity.DB().Create(&wr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wr})
}

// GET
func GetWorkReceive(c *gin.Context) {
	var workrecive entity.WorkReceive
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM work_receives WHERE id = ?", id).Scan(&workrecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workrecive})
}

// GET
func ListWorkReceives(c *gin.Context) {
	var workrecive []entity.WorkReceive

	if err := entity.DB().Preload("Employee").Preload("WorkPlace").Preload("RepairRequest").Raw("SELECT * FROM work_receives").Find(&workrecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workrecive})
}

// DELETE
func DeleteWorkReceive(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM work_receives WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "work not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH
func UpdateWorkReceive(c *gin.Context) {
	var workrecive entity.WorkReceive
	if err := c.ShouldBindJSON(&workrecive); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", workrecive.ID).First(&workrecive); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&workrecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workrecive})
}

func GetWorkreceivewithEmployee(c *gin.Context) {
	var workrecive []entity.WorkReceive
	employeeid := c.Param("employeeid")
	if err := entity.DB().Preload("Employee").Raw("SELECT * FROM work_receives WHERE employee_id = ?", employeeid).Find(&workrecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": workrecive})
}

// (ohm) GET /work_recives
func ListWorkReceiveWithNoDuplicateID(c *gin.Context) {
	var workrecive []entity.WorkReceive

	// ค้นหา work receive ทั้งหมดที่ไม่มีในข้อมูล warrantee
	if err := entity.DB().Preload("Employee").Preload("RepairRequest").Raw("SELECT * FROM work_receives WHERE id NOT IN (SELECT DISTINCT work_receive_id FROM warrantees)").Find(&workrecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workrecive})
}
