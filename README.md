# fingermark-challenge

## Table of contents
* [Technologies](#frontend)
* [Setup](#setup)
* [Possible improvements](#possible-improvements)

## Technologies
### Frontend
Was created with the follwing packages:
* Vite: 4.0.0
* Typescript: 4.9.3 
* Tailwindcss: 3.2.4
* Recoil: 0.7.6
* React: 18.2.0
* React Router: 18.2.0
* Axios: 0.7.6
* Moment: 2.29.4
* Fontawesome: 6.2.1

### Backend
Was created with the follwing packages:
* Express: 4.18.2
* node-cron: 3.0.2
* uuid: 9.0.0
* mongoose: 6.8.3
* dotenv: 16.0.3
* cors: 2.8.5
* moment: 2.29.4
* typescript: 4.9.4
* nodemon: 2.0.20
* concurrently: 7.6.0

### Screen
![alt text](apps/frontend/kiosk/src/assets/img/screen.png)

## Setup
To run this project:

1. Install mongodb;
2. Install rush globally and pnpm if you like;
3. Install projects locally using rush.js;

### Installing 
```
git clone https://github.com/zamfonato/fingermark-challenge.git
cd .\fingermark-challenge\
rush install
```
### Configure and run backend
```
cd .\apps\backend\api\
rename .env.example to .env
rushx build
rushx dev
```
### Configure and run frontend
```
cd .\apps\frontend\kiosk\
rename .env.example to .env 
rushx build
rushx dev
```

## Possible improvements
- Add unit test
- Refactor some components for more general purpose
- Add a server logger for jobs and erros
- Add socket.io to populate cards data in realtime