package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"gorm.io/gorm"
)

func CreateNoteHandler(w http.ResponseWriter, r *http.Request) {
	var payload CreateNoteSchema
	w.Header().Set("Content-Type", "application/json")

	// Decode JSON request body into the payload struct
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status":  "fail",
			"message": err.Error(),
		})
		return
	}

	// Validate payload struct
	errors := ValidateStruct(&payload)
	if errors != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(errors)
		return
	}

	now := time.Now()
	newNote := Note{
		Title:     payload.Title,
		Content:   payload.Content,
		Category:  payload.Category,
		Published: payload.Published,
		CreatedAt: now,
		UpdatedAt: now,
	}

	// Save new note to the database
	result := DB.Create(&newNote)
	if result.Error != nil {
		if strings.Contains(result.Error.Error(), "UNIQUE constraint failed") {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"status":  "fail",
				"message": "Title already exists, please use another title",
			})
			return
		}

		w.WriteHeader(http.StatusBadGateway)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status":  "error",
			"message": result.Error.Error(),
		})
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"note": newNote,
		},
	})
}

func FindNotes(w http.ResponseWriter, r *http.Request) {
	page := r.URL.Query().Get("page")
	limit := r.URL.Query().Get("limit")
	w.Header().Set("Content-Type", "application/json")

	if page == "" {
		page = "1"
	}

	if limit == "" {
		limit = "10"
	}

	intPage, err := strconv.Atoi(page)
	if err != nil {
		http.Error(w, "Invalid page parameter", http.StatusBadRequest)
		return
	}

	intLimit, err := strconv.Atoi(limit)
	if err != nil {
		http.Error(w, "Invalid limit parameter", http.StatusBadRequest)
		return
	}

	offset := (intPage - 1) * intLimit

	var notes []Note
	results := DB.Limit(intLimit).Offset(offset).Find(&notes)
	if results.Error != nil {
		http.Error(w, results.Error.Error(), http.StatusBadGateway)
		return
	}

	// Return success response
	response := map[string]interface{}{
		"status":  "success",
		"results": len(notes),
		"notes":   notes,
		"page":    intPage,
		"limit":   intLimit,
	}
	json.NewEncoder(w).Encode(response)
}

func FindNoteById(w http.ResponseWriter, r *http.Request) {
	noteID := r.PathValue("noteId")
	w.Header().Set("Content-Type", "application/json")

	var note Note
	result := DB.First(&note, "id = ?", noteID)
	if err := result.Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			w.WriteHeader(http.StatusNotFound)
			response := map[string]interface{}{
				"status":  "fail",
				"message": "No note with that ID exists",
			}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusBadGateway)
		response := map[string]interface{}{
			"status":  "fail",
			"message": err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"note": note,
		},
	}

	json.NewEncoder(w).Encode(response)
}

func UpdateNote(w http.ResponseWriter, r *http.Request) {
	noteID := r.PathValue("noteId")
	w.Header().Set("Content-Type", "application/json")

	var payload UpdateNoteSchema
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var note Note
	result := DB.First(&note, "id = ?", noteID)
	if err := result.Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			errorResponse := map[string]interface{}{
				"status":  "fail",
				"message": "No note with that ID exists",
			}
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(errorResponse)
			return
		}

		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

	updates := make(map[string]interface{})
	if payload.Title != "" {
		updates["title"] = payload.Title
	}
	if payload.Content != "" {
		updates["content"] = payload.Content
	}
	if payload.Category != "" {
		updates["category"] = payload.Category
	}
	if payload.Published != nil {
		updates["published"] = payload.Published
	}
	updates["updated_at"] = time.Now()

	DB.Model(&note).Updates(updates)

	response := map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"note": note,
		},
	}
	json.NewEncoder(w).Encode(response)
}

func DeleteNote(w http.ResponseWriter, r *http.Request) {
	noteID := r.PathValue("noteId")
	w.Header().Set("Content-Type", "application/json")

	result := DB.Delete(&Note{}, "id = ?", noteID)
	if result.RowsAffected == 0 {
		w.WriteHeader(http.StatusNotFound)
		response := map[string]interface{}{
			"status":  "fail",
			"message": "No note with that ID exists",
		}
		json.NewEncoder(w).Encode(response)
		return
	} else if result.Error != nil {
		w.WriteHeader(http.StatusBadGateway)
		response := map[string]interface{}{
			"status":  "error",
			"message": result.Error.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := map[string]interface{}{
		"status":  "success",
		"message": "Note deleted successfully",
	}
	json.NewEncoder(w).Encode(response)
}
