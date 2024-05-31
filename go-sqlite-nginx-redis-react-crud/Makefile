# Production
build:
	docker-compose -f docker-compose.dev.yml build

prod:
	docker-compose -f docker-compose.yml up -d

# make logs service=next-fe
logs:
	docker-compose -f docker-compose.yml logs -f $(service)

# Development
build-dev:
	docker-compose -f docker-compose.dev.yml build

dev:
	docker-compose -f docker-compose.dev.yml up -d

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f $(service)

down:
	docker-compose -f docker-compose.dev.yml -f docker-compose.yml down --volumes --rmi local