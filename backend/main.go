package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/controller"
	"github.com/sut64/team05/entity"
	middlewares "github.com/sut64/team05/middleware"
)

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{

			// employee Routes
			// protected.GET("/emplayoees/employeeeamil/:EmployeeEmail", controller.ClubwithActivity) // ระบุ parameter ClubID
			protected.GET("/emplayoees", controller.ListEmployees)
			protected.GET("/emplayoee/:id", controller.GetEmployee)
			protected.POST("/emplayoees", controller.CreateEmployee)
			protected.PATCH("/emplayoees", controller.UpdateEmployee)
			protected.DELETE("/emplayoees/:id", controller.DeleteEmployee)

			// paidby Routes
			// protected.GET("/clubname/clubcommittee/:id", controller.GetClubwithClubCommittee)
			protected.GET("/paidbies", controller.ListPaidBies)
			protected.GET("/paidby/:id", controller.GetPaidBy)
			protected.POST("/paidbies", controller.CreatePaidBy)
			protected.PATCH("/paidbies", controller.UpdatePaidBy)
			protected.DELETE("/paidbies/:id", controller.DeletePaidBy)

			// reciethistory Routes
			protected.GET("/recipt_histories", controller.ListRecieptHistorys)
			protected.GET("/recipt_history/:id", controller.GetRecieptHistory)
			protected.POST("/recipt_histories", controller.CreateRecieptHistory)
			protected.PATCH("/recipt_histories", controller.UpdateBudgetProposal)
			protected.DELETE("/recipt_histories/:id", controller.DeleteBudgetProposal)

			// workrecive Routes
			protected.GET("/workrecives/employees/:employeeid", controller.GetWorkrecivewithEmployee)
			protected.GET("/workrecives", controller.ListWorkrecives)
			protected.GET("/workrecive/:id", controller.GetWorkrecive)
			protected.POST("/workrecives", controller.CreateWorkrecive)
			protected.PATCH("/workrecives", controller.UpdateWorkrecive)
			protected.DELETE("/workrecives/:id", controller.DeleteWorkrecive)

		}
	}

	// Authentication Routes
	r.POST("/login", controller.LoginByEmployee)

	// Run the server
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
