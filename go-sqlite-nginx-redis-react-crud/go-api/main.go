package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/rs/cors"
)

func init() {
	// Initialize the database
	// error := ConnectDB()
	// if error != nil {
	// 	log.Fatalf("Failed to connect to the database: %v", error)
	// }
}

func main() {
	// Port 8080
	port := ":8080"

	// Create router
	router := http.NewServeMux()

	router.HandleFunc("GET /api/test", Test)

	// Custom CORS settings
	corsConfig := cors.New(cors.Options{
		AllowedHeaders: []string{"Origin", "Authorization", "Accept", "Content-Type"},
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowCredentials: true,
	})

	// Wrap the router with the logRequests middleware
	loggedRouter := logRequests(router)

	// Create a new CORS handler
	corsHandler := corsConfig.Handler(loggedRouter)

	server := http.Server{
		Addr: port,
		Handler: corsHandler,
	}

	log.Printf("Starting server on port %s", port)
	if error := server.ListenAndServe(); error != nil {
		log.Fatalf("Failed to start server: %v", error)
	}
}

func Test(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"status": "success",
		"message": "Welcome to Go API",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}