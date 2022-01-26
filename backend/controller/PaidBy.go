package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST /PaidBy
func CreatePaidBy(c *gin.Context) {
	var painby entity.PaidBy
	if err := c.ShouldBindJSON(&painby); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&painby).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": painby})
}

// GET /PaidBy/:id
func GetPaidBy(c *gin.Context) {
	var painby entity.PaidBy
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM paid_bies WHERE id = ?", id).Scan(&painby).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": painby})
}

// GET /PaidBy
func ListPaidBies(c *gin.Context) {
	var painbys []entity.PaidBy
	if err := entity.DB().Raw("SELECT * FROM paid_bies").Scan(&painbys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": painbys})
}

// DELETE /PaidBys/:id
func DeletePaidBy(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM paid_bies WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "budgettype not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /PaidBy
func UpdatePaidBy(c *gin.Context) {
	var painby entity.PaidBy
	if err := c.ShouldBindJSON(&painby); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", painby.ID).First(&painby); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "budgettype not found"})
		return
	}

	if err := entity.DB().Save(&painby).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": painby})
}
