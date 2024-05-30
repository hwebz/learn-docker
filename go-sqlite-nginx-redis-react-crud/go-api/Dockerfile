# Go API Dockerfile
FROM golang:2.12.3

# Set the working directory is /app inside docker container
WORKDIR /app

# Copy depencies config files to container's /app folder
COPY go.mod ./
COPY go.sum ./
# Run to install all required dependencies
RUN go mod download

# Copy all go files to active working directory inside container
COPY *.go ./

# command to build go application
RUN go build -o /go-api

# Expose port 8080 to run go application
EXPOSE 8080

# Run the built program
CMD ["/go-api"]
