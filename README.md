# cs361-microservice
This microservice calculates the difficulty statistics for CS courses at OSU over the past 5 years.

## How to setup
* Make sure to have Node.js [installed](https://nodejs.org/en/)
* Navigate to the correct directory and type npm install to install the required Node modules
* Type npm start to start the server.

## How to request data
* Requesting data is performed by sending a HTTP GET request. 
* Entering http://localhost:3000/stats will give the difficulty statistics for all CS courses at OSU. 
* Using a query parameter in the URL, with the id set to a 3 digit course id, will instead request for the relevant difficulty statistics for that particular course. 
* Example request
  *  http://localhost:3000/stats?id=161 will give the difficulty statistics for CS 161. 

## How to receive data
* A JSON object will be received upon the HTTP GET request. Upon a successful request, the response object will return a 200 status with relevant course difficulty statistics.

* Example response
  * {"averageDifficulty": “2.5”, "lowestDifficulty": "1.7","lowestDifficultYear": "2018","highestDifficulty":"3.5", "highestDifficultyYear":"2021" }

* Invalid requests will return a 404 status. 
  * { Error: "Not found. Please enter a valid course id" }


## UML Sequence Diagram
![UML Sequence Diagram](https://github.com/arahm730/cs361-microservice/blob/main/UML-sequence-diagram.png)
