package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

// POST /partsPurchase
func CreatePartsPurchase(c *gin.Context) {
	var partsPurchase entity.PartsPurchase
	var shopping entity.PurchasingCompany
	var workreceive entity.WorkReceive
	var editor entity.Employee

	if err := c.ShouldBindJSON(&partsPurchase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", partsPurchase.ShoppingID).First(&shopping); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PurchasingCompany not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", partsPurchase.WorkReceiveID).First(&workreceive); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "WorkReceive not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", partsPurchase.EditorID).First(&editor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	newPartsPurchase := entity.PartsPurchase{
		Parts:        partsPurchase.Parts,
		Quantity:     partsPurchase.Quantity,
		PartsPrice:   partsPurchase.PartsPrice,
		PurchaseTime: partsPurchase.PurchaseTime,
		Shopping:     shopping,
		WorkReceive:  workreceive,
		Editor:       editor,
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(newPartsPurchase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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
	if err := entity.DB().Preload("Shopping").Preload("WorkReceive").Preload("Editor").Raw("SELECT * FROM parts_purchases").Find(&partsPurchase).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": partsPurchase})
}
