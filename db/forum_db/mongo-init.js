print("Adding User: ");
db = db.getSiblingDB("forumdb");
db.createUser({
    user: "myuser",
    pwd: "mypassword",
    roles: [{ role: "readWrite", db: "forumdb" }]
})