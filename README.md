# Getting Started with English Test

## Docker Compose Steps

- Build Server and Client images using :
run inside client dir
### `docker build -f Dockerfile -t client .`
run inside server dir
### `docker build -f Dockerfile -t server .`

in the main dir run :

### `docker compose up`

### Server runs on port 5000 
### Client runs on port 3000

## BACKEND (SERVER)
### Available Scripts in Server and how to Run

Before starting the server make sure to install the needed packages using:

### `npm install`

You can run the server using:

### `npm run dev`

Runs the server using nodemon on port 5000.\

## FRONTEND (CLIENT)

Before starting the client app make sure to install the needed packages using:

### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


