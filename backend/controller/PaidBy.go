package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST /PaidBy
func CreatePaidBy(c *gin.Context) {
	var paidby entity.PaidBy
	if err := c.ShouldBindJSON(&paidby); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&paidby).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paidby})
}

// GET /PaidBy/:id
func GetPaidBy(c *gin.Context) {
	var paidby entity.PaidBy
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM paid_bies WHERE id = ?", id).Scan(&paidby).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": paidby})
}

// GET /PaidBy
func ListPaidBies(c *gin.Context) {
	var paidbys []entity.PaidBy
	if err := entity.DB().Raw("SELECT * FROM paid_bies").Scan(&paidbys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": paidbys})
}
