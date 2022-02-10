package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/entity"
)

//POST /repairHistory
func CreateRepairHistory(c *gin.Context) {

	var repairhistory entity.RepairHistory
	var repairrequest entity.RepairRequest
	var difficulty entity.Difficulty
	var editor entity.Employee

	//result from pushing button will be *bind* into repairhistory
	if err := c.ShouldBindJSON(&repairhistory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: search *repairrequest* with id
	if tx := entity.DB().Where("id = ?", repairhistory.RepairRequestID).First(&repairrequest); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairrequest not found"})
		return
	}

	// 9: search *difficulty* with id
	if tx := entity.DB().Where("id = ?", repairhistory.DifficultyID).First(&difficulty); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "difficulty not found"})
		return
	}

	// 10: search *editor* with id
	if tx := entity.DB().Where("id = ?", repairhistory.EditorID).First(&editor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "editor not found"})
		return
	}

	// 11: create RepairHistory
	jah := entity.RepairHistory{
		RepairRequest: repairrequest,           // โยงความสัมพันธ์กับ Entity RepairRequest
		Difficulty:    difficulty,              // โยงความสัมพันธ์กับ Entity Difficulty
		Problem:       repairhistory.Problem,   // ตั้งค่าฟิลด์ Problem
		Solution:      repairhistory.Solution,  // ตั้งค่าฟิลด์ Solution
		Success:       repairhistory.Success,   // ตั้งค่าฟิลด์ Sucess
		Editor:        editor,                  // โยงความสัมพันธ์กับ Entity Employee
		Timestamp:     repairhistory.Timestamp, // ตั้งค่าฟิลด์ Timestamp
	}

	// validation part in controller
	if _, err := govalidator.ValidateStruct(jah); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := entity.CheckNullBool(jah.Success); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 12: save
	if err := entity.DB().Create(&jah).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": jah})

}

// GET /repairhistory/:id
func GetRepairHistory(c *gin.Context) {
	var repairhistory entity.RepairHistory
	id := c.Param("id")
	if err := entity.DB().Preload("Editor").Preload("RepairRequest").Preload("Difficulty").Raw("SELECT * FROM repair_histories WHERE id = ?", id).Find(&repairhistory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repairhistory})

}

// GET /repair_histories
// fix 1to1
func ListRepairHistories(c *gin.Context) {
	var repairhistories []entity.RepairHistory
	if err := entity.DB().Preload("Editor").Preload("RepairRequest").Preload("Difficulty").Raw("SELECT * FROM repair_histories").Find(&repairhistories).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairhistories})
}

// DELETE /repair_histories/:id
func DeleteRepairHistory(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM repair_histories WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairhistory not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /repair_histories
func UpdateRepairHistory(c *gin.Context) {
	var repairhistory entity.RepairHistory
	if err := c.ShouldBindJSON(&repairhistory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", repairhistory.ID).First(&repairhistory); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairhistory not found"})
		return
	}

	if err := entity.DB().Save(&repairhistory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairhistory})
}
