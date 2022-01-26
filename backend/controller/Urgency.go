package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/offoneway/team05/entity"
)

// POST /urgencys
func CreateUrgency(c *gin.Context) {
	var urgency entity.Urgency
	if err := c.ShouldBindJSON(&urgency); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&urgency).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": urgency})
}

// GET /urgency/:id
func GetUrgency(c *gin.Context) {
	var urgency entity.Urgency
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM urgencys WHERE id = ?", id).Scan(&urgency).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": urgency})
}

// GET /urgencys
func ListUrgencys(c *gin.Context) {
	var urgencys []entity.Urgency
	if err := entity.DB().Raw("SELECT * FROM urgencys").Scan(&urgencys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": urgencys})
}

// DELETE /urgencys/:id
func DeleteUrgency(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM urgencys WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "urgency not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /urgencys
func UpdateUrgency(c *gin.Context) {
	var urgency entity.Urgency
	if err := c.ShouldBindJSON(&urgency); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", urgency.ID).First(&urgency); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "urgency not found"})
		return
	}

	if err := entity.DB().Save(&urgency).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": urgency})
}
