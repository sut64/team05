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
			protected.GET("/repair_requests", controller.ListRepairRequests)
			protected.GET("/repair_request/:id", controller.GetRepairRequest)
			protected.POST("/repair_requests", controller.CreateRepairRequest)
			protected.PATCH("/repair_requests", controller.UpdateRepairRequest)
			protected.DELETE("/repair_requests/:id", controller.DeleteRepairRequest)

			protected.GET("/repair_request_notin_repair_histories", controller.ListRepairRequestNotINRepairHistory)

			// RepairType Routes
			protected.GET("/repair_types", controller.ListRepairtypes)
			protected.GET("/repair_type/:id", controller.GetRepairtype)
			protected.POST("/repair_types", controller.CreateRepairtype)
			protected.PATCH("/repair_types", controller.UpdateRepairtype)
			protected.DELETE("/repair_types/:id", controller.DeleteRepairtype)

			// Urgency Routes
			protected.GET("/urgencies", controller.ListUrgencies)
			protected.GET("/urgency/:id", controller.GetUrgency)
			protected.POST("/urgencies", controller.CreateUrgency)
			protected.PATCH("/urgencies", controller.UpdateUrgency)
			protected.DELETE("/urgencies/:id", controller.DeleteUrgency)

			// Customer Routes
			protected.GET("/customers", controller.ListCustomers)
			protected.GET("/customer/:id", controller.GetCustomer)
			protected.GET("/customer/find_with_customerID/:id_customer", controller.GetCustomerWithCustomerID)
			protected.POST("/customers", controller.CreateCustomer)
			protected.PATCH("/customers", controller.UpdateCustomer)
			protected.DELETE("/customers/:id", controller.DeleteCustomer)

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
			protected.GET("/WorkReceives", controller.ListWorkReceives)
			protected.POST("/WorkReceives", controller.CreateWorkReceive)
			protected.GET("/WorkPlaces", controller.ListWorkPlace)
			protected.GET("/RepairRequestsNotInWorkReceive", controller.ListRepairRequestNotINWorkReceive)
			// ohm
			protected.GET("/work_receives", controller.ListWorkReceiveWithNoDuplicateID)
			//bang
			protected.GET("/workreceivesbybang", controller.ListRecieptHistoryNotINWorkReceive)

			// paidby Routes
			protected.GET("/paidbies", controller.ListPaidBies)
			protected.GET("/paidby/:id", controller.GetPaidBy)
			protected.POST("/paidbies", controller.CreatePaidBy)

			// reciethistory Routes
			protected.GET("/reciept_histories", controller.ListRecieptHistorys)
			protected.GET("/reciept_historie/:id", controller.GetRecieptHistory)
			protected.POST("/reciept_histories", controller.CreateRecieptHistory)

			//partsPurchase Routes
			protected.GET("/partsPurchase", controller.ListPartsPurchase)
			protected.POST("/partsPurchase", controller.CreatePartsPurchase)

			//purchasingCompany
			protected.GET("/purchasingCompany", controller.ListPurchasingCompany)

			// Warrantee Routes
			protected.GET("/warrantees", controller.ListWarrantees)
			protected.GET("/warrantee/:id", controller.GetWarrantee)
			protected.POST("/warrantee", controller.CreateWarrantee)
			protected.PATCH("/warrantee", controller.UpdateWarrantee)
			protected.DELETE("/warrantee/:id", controller.DeleteWarrantee)

			// WarranteeType Routes
			protected.GET("/warrantee_types", controller.ListWarranteeType)
			protected.GET("/warrantee_type/:id", controller.GetWarranteeType)
			protected.POST("/warrantee_type", controller.CreateWarranteeType)
			protected.PATCH("/warrantee_type", controller.UpdateWarranteeType)
			protected.DELETE("/warrantee_type/:id", controller.DeleteWarranteeType)
		}

		// Authentication Routes
		r.POST("/login_employee", controller.LoginByEmployee)
		r.POST("/login_customer", controller.LoginByCustomer)

		//Run server
		r.Run()
	}
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
