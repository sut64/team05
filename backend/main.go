package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut64/team05/controller"
	"github.com/sut64/team05/entity"
	"github.com/sut64/team05/middlewares"
)

//อันนี้ก็จริงครับ
func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{

			//RepairRequest Routes
			r.GET("/repair_requests", controller.ListRepairRequests)
			r.GET("/repair_request/:id", controller.GetRepairRequest)
			r.POST("/repair_requests", controller.CreateRepairRequest)
			r.PATCH("/repair_requests", controller.UpdateRepairRequest)
			r.DELETE("/repair_requests/:id", controller.DeleteRepairRequest)

			// RepairType Routes
			r.GET("/repair_types", controller.ListRepairtypes)
			r.GET("/repair_type/:id", controller.GetRepairtype)
			r.POST("/repair_types", controller.CreateRepairtype)
			r.PATCH("/repair_types", controller.UpdateRepairtype)
			r.DELETE("/repair_types/:id", controller.DeleteRepairtype)

			// Urgency Routes
			r.GET("/urgencies", controller.ListUrgencies)
			r.GET("/urgency/:id", controller.GetUrgency)
			r.POST("/urgencies", controller.CreateUrgency)
			r.PATCH("/urgencies", controller.UpdateUrgency)
			r.DELETE("/urgencies/:id", controller.DeleteUrgency)

			// Customer Routes
			r.GET("/customers", controller.ListCustomers)
			r.GET("/customer/:id", controller.GetCustomer)
			r.GET("/customer/find_with_customerID/:id_customer", controller.GetCustomerWithCustomerID)
			r.POST("/customers", controller.CreateCustomer)
			r.PATCH("/customers", controller.UpdateCustomer)
			r.DELETE("/customers/:id", controller.DeleteCustomer)

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

			//WorkReceive Routes
			protected.GET("/workreceives/employees/:employeeid", controller.GetWorkreceivewithEmployee)
			protected.GET("/WorkReceives", controller.ListWorkRecives)
			protected.POST("/WorkReceives", controller.CreateWorkRecive)
			protected.GET("/WorkPlaces", controller.ListWorkPlace)
			protected.GET("/RepairRequestsNotInWorkReceive", controller.ListRepairRequestNotINWorkReceive)

			// paidby Routes
			protected.GET("/paidbies", controller.ListPaidBies)
			protected.GET("/paidby/:id", controller.GetPaidBy)
			protected.POST("/paidbies", controller.CreatePaidBy)

			// reciethistory Routes
			protected.GET("/reciept_histories", controller.ListRecieptHistorys)
			protected.GET("/reciept_historie/:id", controller.GetRecieptHistory)
			protected.POST("/reciept_histories", controller.CreateRecieptHistory)

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
