
docker compose create # create container from existing docker compose.yaml
docker compose start # start container 
docker compose down # stop container 

# compose up: create + start container
# -d enable the build process in background
docker compose up -d
docker compose down

# use -f or --file to define docker-compose config file
docker compose --file docker-compose.staging.yaml up -d
docker compose --file docker-compose.staging.yaml down