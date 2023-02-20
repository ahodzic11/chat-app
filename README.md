# Chat application solution

Solution was implemented using React and NodeJS. 

For data storage, MongoDB is used. 


After cloning the repository, open the terminal and write `npm install` to install the missing packages.

`cd backend` and `npm start` or `npm run dev` will start the backend. \
`cd frontend` and `npm start` will start the frontend.

To run the app using docker containers, clone the GitHub repository, position yourself at each folder and build docker images and then do `docker-compose up`, while positioned in the root directory.

To build the frontend image, use `docker build -t frontend .`, while in the frontend directory.\
To build the backend image, use `docker build -t backend .`, while in the backend directory.

Application is dockerized, and the repository can be found on https://hub.docker.com/r/ahodzic11/chat-app-backend.

Three different docker images were uploaded, instead of containing them in a single docker container.
To clone the repository, use `docker pull ahodzic11/chat-app-backend` and the following tags:\
`frontend` for frontend image, \
`backend` for backend image, \
`latest` for mongo image. 

After that, run docker-compose up and the application will be up and running.
