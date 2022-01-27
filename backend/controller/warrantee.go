package controller

import (
	// "fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST /warrantee
func CreateWarrantee(c *gin.Context) {
	var warrantee entity.Warrantee
	var employee entity.Employee
	var workReceive entity.WorkReceive
	var warranteeType entity.WarranteeType

	// ผลลัพธ์จะถูก bind เข้าตัวแปร warrantee
	if err := c.ShouldBindJSON(&warrantee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", warrantee.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ค้นหา workRecive ด้วย id
	if tx := entity.DB().Where("id = ?", warrantee.WorkReceiveID).First(&workReceive); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "work receicve not found"})
		return
	}

	// ค้นหา warranteeType ด้วย id
	if tx := entity.DB().Where("id = ?", warrantee.WarranteeTypeID).First(&warranteeType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "warrantee type not found"})
		return
	}

	// สร้าง Warrantee
	w := entity.Warrantee{
		Employee:       employee,                 // โยงความสัมพันธ์กับ Entity Employee
		WorkReceive:    workReceive,              // โยงความสัมพันธ์กับ Entity WorkRecive
		WarranteeType:  warranteeType,            // โยงความสัมพันธ์กับ Entity WarranteeType
		WarrantyPart:   warrantee.WarrantyPart,   // ตั้งค่าฟิลด์ WarrantyPart
		MaximumAmount:  warrantee.MaximumAmount,  // ตั้งค่าฟิลด์ MaximumAmount
		EndOfWarrantee: warrantee.EndOfWarrantee, // ตั้งค่าฟิลด์ EndOfWarrantee
	}

	if err := entity.DB().Save(&w).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": w})
}

// GET /warrantee/:id
func GetWarrantee(c *gin.Context) {
	var warrantee entity.Warrantee
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM users WhERE id = ?", id).Scan(&warrantee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": warrantee})
}

// GET /warrantees
func ListWarrantees(c *gin.Context) {
	var warrantee []entity.Warrantee
	if err := entity.DB().Raw("SELECT * FROM users").Scan(&warrantee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": warrantee})
}

// DELETE /warrantees/:id
func DeleteWarrantee(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /warrantee
func UpdateWarrantee(c *gin.Context) {
	var warrantee entity.Warrantee
	if err := c.ShouldBindJSON(&warrantee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", warrantee.ID).First(&warrantee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&warrantee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": warrantee})
}
