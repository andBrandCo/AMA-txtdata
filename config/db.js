// Set the connection string based from the config vars of the production server
// To run locally use 'mongodb://localhost/mern-crud' instead of process.env.DB

module.exports = {
  // db: process.env.DB
  // db: 'mongodb://localhost/mern-crud'
  // db: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-gvxud.mongodb.net/admin?retryWrites=true&w=majority`
  // db: `mongodb+srv://joshua:B52d0k98G2WvgPIL@cluster0-gvxud.mongodb.net/admin?retryWrites=true&w=majority`
  // db: `mongodb://joshua:B52d0k98G2WvgPIL@cluster0-shard-00-00-gvxud.mongodb.net:27017,cluster0-shard-00-01-gvxud.mongodb.net:27017,cluster0-shard-00-02-gvxud.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
  db: `mongodb+srv://joshua1:joshua1@cluster0-gvxud.mongodb.net/cluster0?retryWrites=true&w=majority`
};
