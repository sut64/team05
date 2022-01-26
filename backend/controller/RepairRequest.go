package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/offoneway/team05/entity"
)

// POST /repairrequests
func CreateRepairrequest(c *gin.Context) {
	var repairrequest entity.Repairrequest
	if err := c.ShouldBindJSON(&repairrequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&repairrequest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repairrequest})
}

// GET /repairrequest/:id
func GetRepairrequest(c *gin.Context) {
	var repairrequest entity.Repairrequest
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM repairrequests WHERE id = ?", id).Scan(&repairrequest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairrequest})
}

// GET /repairrequests
func ListRepairrequests(c *gin.Context) {
	var repairrequests []entity.Repairrequest
	if err := entity.DB().Raw("SELECT * FROM repairrequests").Scan(&repairrequests).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairrequests})
}

// DELETE /repairrequests/:id
func DeleteRepairrequest(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM repairrequests WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairrequest not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /repairrequests
func UpdateRepairrequest(c *gin.Context) {
	var repairrequest entity.Repairrequest
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
