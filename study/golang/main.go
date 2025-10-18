package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Root endpoint
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Hello, Go API!"})
	})

	// Dynamic endpoint
	r.GET("/items/:id", func(c *gin.Context) {
		id := c.Param("id")
		q := c.Query("q")
		c.JSON(http.StatusOK, gin.H{"item_id": id, "query": q})
	})

	r.Run() // listens on :8080 by default
}
