# Makefile для Docker операций

.PHONY: help build up down restart logs clean dev-build dev-up dev-down

help:
	@echo "Доступные команды:"
	@echo "  make build       - Собрать production образ"
	@echo "  make up          - Запустить контейнеры (production)"
	@echo "  make down        - Остановить контейнеры"
	@echo "  make restart     - Перезапустить контейнеры"
	@echo "  make logs        - Показать логи"
	@echo "  make clean       - Удалить контейнеры и образы"
	@echo "  make dev-up      - Запустить в режиме разработки"
	@echo "  make dev-down    - Остановить режим разработки"

# Production команды
build:
	docker build -t glavredus-frontend:latest .

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
	docker rmi glavredus-frontend:latest || true

# Development команды
dev-up:
	docker-compose -f docker-compose.dev.yml up -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f