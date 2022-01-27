package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST /repairrequests
func CreateRepairRequest(c *gin.Context) {
	var repairrequest entity.RepairRequest
	var urgency entity.Urgency
	var repairtype entity.RepairType
	var customer entity.Customer

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร repairrequest
	if err := c.ShouldBindJSON(&repairrequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา student ด้วย id
	if tx := entity.DB().Where("id = ?", repairrequest.CustomerID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "customer not found"})
		return
	}

	// 11: ค้นหา urgency ด้วย id
	if tx := entity.DB().Where("id = ?", repairrequest.UrgencyID).First(&urgency); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "urgency not found"})
		return
	}
	// 12: ค้นหา repairtype ด้วย id
	if tx := entity.DB().Where("id = ?", repairrequest.RepairTypeID).First(&repairtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairtype not found"})
		return
	}

	// 13: สร้าง RepairRequest
	rr := entity.RepairRequest{
		Urgency:     urgency,    // โยงความสัมพันธ์กับ Entity Urgency
		RepairType:  repairtype, // โยงความสัมพันธ์กับ Entity RepairType
		Customer:    customer,   // โยงความสัมพันธ์กับ Entity Customer
		Device:      repairrequest.Device,
		Lifetime:    repairrequest.Lifetime,
		Issue:       repairrequest.Issue,
		RequestDate: repairrequest.RequestDate, // ตั้งค่าฟิลด์ DateTime
	}

	// 14: บันทึก
	if err := entity.DB().Create(&rr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rr})
}

// GET /repairrequest/:id
func GetRepairRequest(c *gin.Context) {
	var repairrequest entity.RepairRequest
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM repair_requests WHERE id = ?", id).Scan(&repairrequest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairrequest})
}

// GET /repairrequests
func ListRepairRequests(c *gin.Context) {
	var repairrequests []entity.RepairRequest
	if err := entity.DB().Preload("Customer").Preload("RepairType").Preload("Urgency").Raw("SELECT * FROM repair_requests").Find(&repairrequests).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairrequests})
}

// DELETE /repairrequests/:id
func DeleteRepairRequest(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM repair_requests WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairrequest not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /repairrequests
func UpdateRepairRequest(c *gin.Context) {
	var repairrequest entity.RepairRequest
	if err := c.ShouldBindJSON(&repairrequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", repairrequest.ID).First(&repairrequest); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairrequest not found"})
		return
	}

	if err := entity.DB().Save(&repairrequest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairrequest})
}
