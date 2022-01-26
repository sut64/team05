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

	// fmt.Println(c)

	if err := c.ShouldBindJSON(&warrantee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&warrantee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": warrantee})
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
