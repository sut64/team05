package controller

import (
	"fmt"
	"net/http"
	"reflect"
	"strconv"

	"github.com/asaskevich/govalidator"
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

	fmt.Println(reflect.TypeOf(warrantee.MaximumAmount))

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

	// auto generate id_warrantee
	var id int
	if err := entity.DB().Raw("SELECT COUNT(id) FROM warrantees").Find(&id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id of warrantee not found"})
		return
	}
	if id == 0 {
		warrantee.ID_Warrantee = "G000001"
	} else {
		if err := entity.DB().Raw("SELECT MAX(id) FROM warrantees").Find(&id).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "id of warrantee not found"})
			return
		}
		id_warrantee := strconv.Itoa(id + 1)
		for i := 0; len(id_warrantee) < 6; i++ {
			id_warrantee = "0" + id_warrantee
		}
		id_warrantee = "G" + id_warrantee

		warrantee.ID_Warrantee = id_warrantee
	}

	// สร้าง Warrantee
	w := entity.Warrantee{
		Employee:       employee,                 // โยงความสัมพันธ์กับ Entity Employee
		WorkReceive:    workReceive,              // โยงความสัมพันธ์กับ Entity WorkRecive
		WarranteeType:  warranteeType,            // โยงความสัมพันธ์กับ Entity WarranteeType
		ID_Warrantee:   warrantee.ID_Warrantee,   // ตั้งค่าฟิลด์ ID_Warrantee
		WarrantyPart:   warrantee.WarrantyPart,   // ตั้งค่าฟิลด์ WarrantyPart
		MaximumAmount:  warrantee.MaximumAmount,  // ตั้งค่าฟิลด์ MaximumAmount
		EndOfWarrantee: warrantee.EndOfWarrantee, // ตั้งค่าฟิลด์ EndOfWarrantee
	}

	if _, err := govalidator.ValidateStruct(w); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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

	if err := entity.DB().Preload("Employee").Preload("WorkReceive").Preload("WarranteeType").Raw("SELECT * FROM warrantees WHERE id = ?", id).Find(&warrantee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": warrantee})

	// preload เป็นการดึงข้อมูลมาจาก FK ของตารางที่ใช้ในคำสั่ง Raw

}

// GET /warrantees
func ListWarrantees(c *gin.Context) {
	var warrantee []entity.Warrantee
	if err := entity.DB().Preload("Employee").Preload("WorkReceive").Preload("WarranteeType").Raw("SELECT * FROM warrantees").Find(&warrantee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": warrantee})
}

// DELETE /warrantees/:id
func DeleteWarrantee(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM warrantees WHERE id = ?", id); tx.RowsAffected == 0 {
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
