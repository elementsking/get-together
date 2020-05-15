# get-together
A chat app that allows for planning, hosting, and contributing to events and communities


## To start the services:
1. clone this repository
2. docker-compose up -d
3. cd frontend
4. yarn install

## To use the chat service:
1. start the backend services
2. `docker-compose exec backend ./manage.py createsuperuser` 
and follow the steps to create a superuser
3. Navigate to http://localhost:8001/admin/api/gettogetheruser/, login with root
4. create a new chat user by clicking "Add User" and following the form
5. `cd frontend; yarn start` to start the React development server
6. Navigate to http://localhost:3000 and click the "Log In" button in the React app 
and log in with that new user
7. Click 'Groups'
8. Use the form to create a new Group (which can't contain spaces)
9. you can just duplicate the window and send messages between browsers

## Development
1. Start the services
2. cd frontend && yarn start

## Known Issues
* This app does not refresh tokens reliably at this time, 
so you'll need to log out and back in if your token expires. 
Tokens are used to authenticate you when you open a websocket.
* This app does not fetch previously sent messages yet

## Roadmap
* Pull all old messages for a Group
* CRUD on Events in a Group
* Show a homepage where a User's Groups and Events are pulled
