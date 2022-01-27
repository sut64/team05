package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST /partsPurchase
func CreatePartsPurchase(c *gin.Context) {
	var partsPurchase entity.PartsPurchase
	var shopping entity.PurchasingCompany
	var workrecive entity.WorkReceive
	var editor entity.Employee

	if err := c.ShouldBindJSON(&partsPurchase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", partsPurchase.ShoppingID).First(&shopping); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PurchasingCompany not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", partsPurchase.WorkreciveID).First(&workrecive); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "WorkReceive not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", partsPurchase.EditorID).First(&editor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee council not found"})
		return
	}

	newPartsPurchase := entity.PartsPurchase{
		Parts:        partsPurchase.Parts,
		Quantity:     partsPurchase.Quantity,
		PartsPrice:   partsPurchase.PartsPrice,
		PurchaseTime: partsPurchase.PurchaseTime,
		Shopping:     shopping,
		Workrecive:   workrecive,
		Editor:       editor,
	}

	//12 save
	if err := entity.DB().Create(&newPartsPurchase).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": newPartsPurchase})
}

// GET /partsPurchase
func ListPartsPurchase(c *gin.Context) {
	var partsPurchase []entity.PartsPurchase
	if err := entity.DB().Preload("Shopping").Preload("Workrecive").Preload("Editor").Raw("SELECT * FROM parts_purchases").Find(&partsPurchase).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": partsPurchase})
}
