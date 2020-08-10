# bcfServer
This project is a BCF server implementation based on the [BCF API](https://github.com/BuildingSMART/BCF-API) using Node.js and MongoDB. It aims to quickly provide small servers to test the connection to BCF servers with other applications.

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

# Acknowledgement

The first steps in this project are inspired by Academind's tutorial series [Building a RESTful API with Node.js](https://youtu.be/0oXYLzuucwE?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q), which offers a good introduction to the topic and gives a rough insight into the architecture of our server

