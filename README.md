# TheBookishClub
CMPE280 Web UI (SJSU Fall 2020)

## Technologies
Project is created with:
* React
* NodeJS
* Express
* MongoDB

## Setting up a development environment

### Step 1: Setup
Clone or fork this repository into a directory where you want the project directory to reside.

### Step 2: Install dependencies
In the main directory, run `npm install` so that you can run the React application separately from the backend server.

### Step 3: Create React production
In the main directory, run `npm run build`, which creates a build folder. Copy the build folder into the Backend folder.

### Step 4: Run application
Go to the Backend directory and run dependencies with `npm install`.
Then, run `npm start` to start both the front-end and back-end server.
Open a web browser and put in the URL [http://localhost:5050](http://localhost:5050).

## Notes

1. If React code needs to be modified, test application by repeating Step 3 and Step 4.

2. If you want to run React and Express separately, remove build folder in Backend directory. Then run `npm start`in two different terminals, one in main directory (React) and one in Backend directory (Express).


