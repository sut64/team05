package controller

import (
	"net/http"

	"github.com/sut64/team05/entity"
	"github.com/gin-gonic/gin"
)

// GET /purchasingCompany
func ListPurchasingCompany(c *gin.Context) {
	var purchasingCompany []entity.PurchasingCompany
	if err := entity.DB().Raw("SELECT * FROM purchasing_companies").Scan(&purchasingCompany).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": purchasingCompany})
}