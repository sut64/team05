package controller

import (
	"net/http"

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
	// 10: ค้นหา Employee ด้วย id
	if tx := entity.DB().Where("id = ?", workRecive.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}
	// 11: ค้นหา workPlace ด้วย id
	if tx := entity.DB().Where("id = ?", workRecive.WorkPlaceID).First(&workPlace); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workPlace not found"})
		return
	}

	// 12: ค้นหา repairRequest ด้วย id
	if tx := entity.DB().Where("id = ?", workRecive.RepairRequestID).First(&repairRequest); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairRequest not found"})
		return
	}

	// 12: สร้าง WorkReceive
	wr := entity.WorkReceive{
		FinishedDate: workRecive.FinishedDate,
		Wages:        workRecive.Wages,
		WorkCode:     workRecive.WorkCode,

		Employee:      employee,
		WorkPlace:     workPlace,
		RepairRequest: repairRequest,
	}
	// 13: บันทึก
	if err := entity.DB().Create(&wr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wr})
}

// GET /user/:id
func GetWorkReceive(c *gin.Context) {
	var workrecive entity.WorkReceive
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM work_receives WHERE id = ?", id).Scan(&workrecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workrecive})
}

// GET /users
func ListWorkReceives(c *gin.Context) {
	var workrecive []entity.WorkReceive
	if err := entity.DB().Preload("Employee").Preload("WorkPlace").Preload("RepairRequest").Raw("SELECT * FROM work_receives").Find(&workrecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workrecive})
}

// DELETE /users/:id
func DeleteWorkReceive(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM work_receives WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "work not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
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
func GetWorkrecivewithEmployee(c *gin.Context) {
	var workrecive []entity.WorkReceive
	employeeid := c.Param("employeeid")
	if err := entity.DB().Preload("Employee").Raw("SELECT * FROM work_receives WHERE employee_id = ?", employeeid).Find(&workrecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": workrecive})
}
