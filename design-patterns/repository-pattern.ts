// Nest js uses the same pattern

// user.js
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

module.exports = User;

// userRepository.js
const { MongoClient, ObjectId } = require("mongodb");
const User = require("./user");

class UserRepository {
  constructor() {
    this.client = new MongoClient("mongodb://localhost:27017");
    this.dbName = "myApp";
    this.collectionName = "users";
  }

  async connect() {
    if (!this.client.isConnected()) {
      await this.client.connect();
    }
    return this.client.db(this.dbName).collection(this.collectionName);
  }

  async findAll() {
    const collection = await this.connect();
    const users = await collection.find({}).toArray();
    return users.map((user) => new User(user._id, user.name, user.email));
  }

  async findById(id) {
    const collection = await this.connect();
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user ? new User(user._id, user.name, user.email) : null;
  }

  async save(user) {
    const collection = await this.connect();
    const result = await collection.insertOne({
      name: user.name,
      email: user.email,
    });
    return result.insertedId;
  }

  async delete(id) {
    const collection = await this.connect();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = UserRepository;

// userService.js
const UserRepository = require("./userRepository");
const User = require("./user");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(name, email) {
    const user = new User(null, name, email);
    return await this.userRepository.save(user);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id) {
    return await this.userRepository.findById(id);
  }

  async deleteUser(id) {
    return await this.userRepository.delete(id);
  }
}

module.exports = UserService;
