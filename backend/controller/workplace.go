package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

func GetWorkPlace(c *gin.Context) {
	var workplace entity.WorkPlace
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM work_places WHERE id = ?", id).Scan(&workplace).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workplace})
}

// GET /users
func ListWorkPlace(c *gin.Context) {
	var workplace []entity.WorkPlace
	if err := entity.DB().Raw("SELECT * FROM work_places").Find(&workplace).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workplace})
}
