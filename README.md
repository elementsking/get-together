# get-together
A chat app that allows for planning, hosting, and contributing to events and communities


## To run this service:
1. clone this repository
2. docker-compose up -d
3. cd frontend
4. yarn start

## To use the chat service:
1. once the services are running, navigate to localhost:3000
2. docker-compose exec backend bash
3. In the shell, run `./manage.py createsuperuser ` and follow the steps
4. Navigate to localhost:8001/admin/auth/, login with root, and create a new chat user
5. Click the "Log In" button in the React app and log in with that new user
6. Click "Rooms" and it will take you to the "hippo" chat room
7. Due to no access control at this time, you can just duplicate the window and send messages between browsers
