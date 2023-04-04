db = db.getSiblingDB("chatdb");
db.createUser({
    user: "myuser",
    pwd: "mypassword",
    roles: [{ role: "readWrite", db: "chatdb" }]
})