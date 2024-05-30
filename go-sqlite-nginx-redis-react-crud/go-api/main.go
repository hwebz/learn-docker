package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/rs/cors"
)

func init() {
	// Initialize the database
	err := ConnectDB()
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
}

func main() {
	// Port 8080
	port := ":8080"

	// Create router
	router := http.NewServeMux()

	router.HandleFunc("GET /api/status", APIHealthCheck)
	router.HandleFunc("PATCH /api/notes/{noteId}", UpdateNote)
	router.HandleFunc("GET /api/notes/{noteId}", FindNoteById)
	router.HandleFunc("DELETE /api/notes/{noteId}", DeleteNote)
	router.HandleFunc("POST /api/notes", CreateNoteHandler)
	router.HandleFunc("GET /api/notes", FindNotes)

	// Custom CORS settings
	corsConfig := cors.New(cors.Options{
		AllowedHeaders:   []string{"Origin", "Authorization", "Accept", "Content-Type"},
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowCredentials: true,
	})

	// Wrap the router with the logRequests middleware
	loggedRouter := logRequests(router)

	// Create a new CORS handler
	corsHandler := corsConfig.Handler(loggedRouter)

	server := http.Server{
		Addr:    port,
		Handler: corsHandler,
	}

	log.Printf("Starting server on port %s", port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

func APIHealthCheck(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"status":  "success",
		"message": "Welcome to Go API",
	}

	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		return
	}
}
