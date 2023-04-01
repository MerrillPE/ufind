db = db.getSiblingDB("authdb");
db.createUser({
    user: "myuser",
    pwd: "mypassword",
    roles: [{ role: "readWrite", db: "authdb" }]
})