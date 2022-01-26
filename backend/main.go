package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/controller"
	"github.com/sut64/team05/entity"
	"github.com/sut64/team05/middlewares"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{

			//RepairRequest Routes
			protected.GET("/repair_requests", controller.ListRepairRequests)
			protected.GET("/repair_request/:id", controller.GetRepairRequest)
			protected.POST("/repair_requests", controller.CreateRepairRequest)
			protected.PATCH("/repair_requests", controller.UpdateRepairRequest)
			protected.DELETE("/repair_requests/:id", controller.DeleteRepairRequest)

			//Difficulty Routes
			protected.GET("/difficulties", controller.ListDifficulties)
			protected.GET("/difficulty/:id", controller.GetDifficulty)
			protected.POST("/difficulties", controller.CreateDifficulty)
			protected.PATCH("/difficulties", controller.UpdateDifficulty)
			protected.DELETE("/difficulties/:id", controller.DeleteDifficulty)

			//Employee Routes
			protected.GET("/employees", controller.ListEmployees)
			protected.GET("/employee/:id", controller.GetEmployee)
			protected.POST("/employees", controller.CreateEmployee)
			protected.PATCH("/employees", controller.UpdateEmployee)
			protected.DELETE("/employees/:id", controller.DeleteEmployee)

			//Repairhistory Routes
			protected.GET("/repair_histories", controller.ListRepairHistories)
			protected.GET("/repair_histories/:id", controller.GetRepairHistory)
			protected.POST("/repair_histories", controller.CreateRepairHistory)
			protected.PATCH("/repair_histories", controller.UpdateRepairHistory)
			protected.DELETE("/repair_histories/:id", controller.DeleteRepairHistory)

		}
	}

	// Authentication Routes
	r.POST("/login_employee", controller.LoginByEmployee)

	//Run server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
