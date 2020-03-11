

# GymPoint - Gerenciador de Academia

> Desafio Final do GoStack da Rocketseat

## Instalação e utilização

### Backend - Node.js

1.  Acesse a pasta server e siga os passos abaixos:
2.  Rodar 'yarn' para instalar as dependências
3.  Instalar, criar e subir um banco de dados Postgres (Usei via docker):
```
docker run --name postgresgympoint -e POSTGRES_PASSWORD=gympoint -p 5432:5432 -d postgres:11
```
4.  Instalar, criar e subir um banco de dados Redis (Usei via docker):
```
docker run --name redisgympoint -p 6379:6379 -d -t redis:alpine
```

5.  Acesse o banco postgres com algum gerenciador como exemplo postbird, crie o banco com nome de gympoint
6.  Alterar o arquivo .env.example para .env e alterar as informações
7. Rodar 'yarn sequelize db:migrate'
8. Rodar 'yarn sequelize db:seed:all'
9. Rodar 'yarn dev' // Servidor
10. Rodar 'yarn queue' // Servidor de envio de e-mails

### Frontend WEB - REACTJS

1.  Acesse a pasta web
2.  Rodar 'yarn' para instalar as dependências
3.  Rodar 'yarn start'

### Mobile APP - React Native

1.  Acesse a pasta app
2.  Rodar 'yarn' para instalar as dependências
3.  Alterar o arquivo .env.example para .env e alterar as informações
4.  Com o emulador conectado, rodar 'react-native run-android ou run-ios
5.  Se precisar parar e conectar de novo, rodar 'react-native start
6.  Obs: para emular no celular físico, rodar os comandos:
``` 
adb reverse tcp:8081 tcp:8081 // App
adb reverse tcp:3333 tcp:3333 // Api
adb reverse tcp:9090 tcp:9090 // Reactotron
```

Obs: Projeto testado apenas no Android