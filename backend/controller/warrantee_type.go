package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST /warrantee_type
func CreateWarranteeType(c *gin.Context) {
	var warranteeType entity.WarranteeType

	if err := c.ShouldBindJSON(&warranteeType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&warranteeType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": warranteeType})
}

// GET /warrantee_type/:id
func GetWarranteeType(c *gin.Context) {
	var warranteeType entity.WarranteeType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM warrantee_types WHERE id = ?", id).Scan(&warranteeType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": warranteeType})
}

// GET /warrantee_types
func ListWarranteeType(c *gin.Context) {
	var warranteeType []entity.WarranteeType
	if err := entity.DB().Raw("SELECT * FROM warrantee_types").Scan(&warranteeType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": warranteeType})
}

// DELETE /warrantee_types/:id
func DeleteWarranteeType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM warrantee_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "warrantee type not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /warrantee_type
func UpdateWarranteeType(c *gin.Context) {
	var warranteeType entity.WarranteeType
	if err := c.ShouldBindJSON(&warranteeType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", warranteeType.ID).First(&warranteeType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "warrantee type not found"})
		return
	}

	if err := entity.DB().Save(&warranteeType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": warranteeType})
}
