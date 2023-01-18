# fingermark-challenge

## Table of contents
* [Technologies](#frontend)
* [Setup](#setup)

### Technologies
## Frontend
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

### Screen
![alt text](apps/frontend/kiosk/src/assets/img/screen.png)

## Setup
To run this project:

1. Install mongodb
2. Install rush globally
3. Install projects locally using rush.js:

#### Installing 
```
git clone https://github.com/zamfonato/fingermark-challenge.git
cd .\fingermark-challenge\
rush install
```

#### Configure and run backend
```
cd .\apps\backend\api\
rename .env.example to .env
rushx build
rushx dev
```

#### Configure and run frontend
```
cd .\apps\frontend\kiosk\
rename .env.example to .env 
rushx dev
```



