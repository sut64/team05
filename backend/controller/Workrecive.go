package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST /Workrecive
func CreateWorkrecive(c *gin.Context) {
	var workrecive entity.WorkRecive
	if err := c.ShouldBindJSON(&workrecive); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&workrecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": workrecive})
}

func GetWorkrecivewithEmployee(c *gin.Context) {
	var workrecive []entity.WorkRecive
	employeeid := c.Param("employeeid")
	if err := entity.DB().Preload("Employee").Raw("SELECT * FROM workrecives WHERE employee_id = ?", employeeid).Find(&workrecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": workrecive})
}

// GET /Workrecive/:id
func GetWorkrecive(c *gin.Context) {
	var workrecive entity.WorkRecive
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM workrecives WHERE id = ?", id).Scan(&workrecive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workrecive})
}

// GET /Workrecives
func ListWorkrecives(c *gin.Context) {
	var workrecives []entity.WorkRecive
	if err := entity.DB().Raw("SELECT * FROM workrecives").Scan(&workrecives).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workrecives})
}
