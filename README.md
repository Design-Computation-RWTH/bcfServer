# bcfServer
This project is a BCF server implementation based on the [BCF API](https://github.com/BuildingSMART/BCF-API) using Node.js and MongoDB. It aims to quickly provide small servers to test the connection to BCF servers with other applications.

# Table of content
<!-- toc -->
- [Dependencies/Setup](#Dependencies/Setup)
- [Authentification](#Authentification)
  * [Signup User](#Signup-User)
  * [Login User](#Login-User)
- [Acknowledgement](#Acknowledgement)
<!-- tocstop -->


# Dependencies/Setup
All necessary Node.js packages can be taken from the Package.json. Furthermore a MongoDB is needed (local or cloud-based) which is built according to the following scheme:


```
- BcfServerCluster
  - MainDatabase
    - Projects Collection
    - Users Collection
  - GUID Database 1...n (can be retrieved from the Projects subcollection)
    - Comments Collection
    - Extensions Collection
    - Topics Collection
    - Users Collection
    - Viewpoints Collection
```
This version was built and tested with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
Currently there is no frontend to create users, projects or extensions. All these processes must be entered manually into MongoDB.
Before you can start the you need to create the file "nodemon.json" and fill it with the following information:

```json
{
    "env": {
        "MONGO_ATLAS_URL": "Link_to_your_mongodb",
        "MONGO_ATLAS_MAIN_SERVER" : "name_of_main_db (in this case bcfServer)",
        "JWT_KEY": "your_jwt_secret",
        "SERVER_URL": "url_to_your_server (e.g. http://localhost:3000)"
    }
}
```

After everything is set browse in your terminal to the directory containing the "server.js" file and execute the following command:

```
    cd path/to/your/dir/bcfServer/
    npm start
```

# Authentification
For reasons of simplification, the BCF server currently still deviates from the authentication methods proposed in the BCF API. The following methods must be used to create and log in a user:

## Signup User
### Resource URL
```
POST /bcf/2.1/auth/signup
```
To create a user you have to send a valid token. The server is then checking for the role attached to your account.
There are currently two roles in the BCF server: "user" and "admin". Only the admin is allowed to create new users. All others receive 401 Status code.

### Example Request
```
POST /bcf/2.1/auth/signup
Body: 
{
  "id" : "john-doe@example.org",
  "name" : "John Doe",
  "password" : "myAmazingPassword",
  "role" : "user"
}
```

### Example Response
```
Response Code: 201 - Created
Body: 
{
  "id" : "john-doe@example.org",
  "name" : "John Doe",
  "role" : "user"
}
```

## Login User
### Resource URL
```
POST /bcf/2.1/auth/login
```
At login we send our username and password to the server and receive a token back with which we can authenticate ourselves to the server for our requests. This part is currently not yet compliant with the BCF-API and will probably be changed in the future

### Example Request
```
POST /bcf/2.1/auth/login
Body: 
{
  "id" : "john-doe@example.org",
  "password" : "myAmazingPassword",
}
```

### Example Response
```
Response Code: 200 - OK
Body: 
{
    "message": "Authentication successful",
    "token": "ExampeTokenForRequestOperations"
}
```


# Acknowledgement

The first steps in this project are inspired by Academind's tutorial series [Building a RESTful API with Node.js](https://youtu.be/0oXYLzuucwE?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q), which offers a good introduction to the topic and gives a rough insight into the architecture of our server

