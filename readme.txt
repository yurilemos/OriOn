Para base de dados:
  docker-compose up -d
  docker exec -it orionproject_api_1 bash
  flask db migrade
  flask db upgrade
