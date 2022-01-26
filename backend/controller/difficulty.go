package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST difficulty
func CreateDifficulty(c *gin.Context) {
	var difficulty entity.Difficulty
	if err := c.ShouldBindJSON(&difficulty); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&difficulty).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": difficulty})
}

// GET /difficulties
// List all difficulties
func ListDifficulties(c *gin.Context) {
	var difficulties []entity.Difficulty
	if err := entity.DB().Raw("SELECT * FROM difficulties").Scan(&difficulties).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": difficulties})
}

// GET /difficulty/:id
// Get difficulty by id
func GetDifficulty(c *gin.Context) {
	var difficulty entity.Difficulty
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM difficulties WHERE id = ?", id).Scan(&difficulty).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": difficulty})
}

// PATCH /difficulties
func UpdateDifficulty(c *gin.Context) {
	var difficulty entity.Difficulty
	if err := c.ShouldBindJSON(&difficulty); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", difficulty.ID).First(&difficulty); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "difficulty not found"})
		return
	}

	if err := entity.DB().Save(&difficulty).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": difficulty})
}

// DELETE /difficulties/:id
func DeleteDifficulty(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM difficulties WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "difficulty not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.difficulty{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
