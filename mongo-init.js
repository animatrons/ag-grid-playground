db = db.getSiblingDB("many-grids");

db.createUser({
  user: "client_root",
  pwd: "client_R0ot_pw0rd",
  roles: [{ role: "readWrite", db: "many-grids" }],
});

db.createCollection("restaurants");
db.createCollection("restaurant_groups");
db.createCollection("users");
db.createCollection("roles");
db.createCollection("blacklist");
