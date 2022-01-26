package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST /repairtypes
func CreateRepairtype(c *gin.Context) {
	var repairtype entity.RepairType
	if err := c.ShouldBindJSON(&repairtype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&repairtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repairtype})
}

// GET /repairtype/:id
func GetRepairtype(c *gin.Context) {
	var repairtype entity.RepairType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM repair_types WHERE id = ?", id).Scan(&repairtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairtype})
}

// GET /repairtypes
func ListRepairtypes(c *gin.Context) {
	var repairtypes []entity.RepairType
	if err := entity.DB().Raw("SELECT * FROM repair_types").Scan(&repairtypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairtypes})
}

// DELETE /repairtypes/:id
func DeleteRepairtype(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM repair_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairtype not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /repairtypes
func UpdateRepairtype(c *gin.Context) {
	var repairtype entity.RepairType
	if err := c.ShouldBindJSON(&repairtype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", repairtype.ID).First(&repairtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairtype not found"})
		return
	}

	if err := entity.DB().Save(&repairtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairtype})
}
