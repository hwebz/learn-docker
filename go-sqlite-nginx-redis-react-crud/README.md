# Go - SQLite - Nginx - Redis - React Stack

```
Back-end:       Go 1.22.3
Database:       SQLite latest
Caching:        Redis 7.2.5
Reverse Proxy:  Nginx 1.26.0
Front-end:      React v18 (Next.js) - create-next-app@14.2.3
```


## Production
### Run application
> make prod
### Check logs for all containers
> make logs
### Check logs for specific service
> make logs service=<container_name>


## Development
> make dev
### Check logs for all containers
> make dev-logs
### Check logs for specific service
> make dev-logs service=<container_name>

### Terminate application
> make down