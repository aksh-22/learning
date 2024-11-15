// Mediator interface
interface Mediator {
  sendMessage(message: string, fromUser: User): void;
  addUser(user: User): void;
}

// Concrete Mediator class
class ChatMediator implements Mediator {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  sendMessage(message: string, fromUser: User): void {
    this.users.forEach((user) => {
      if (user !== fromUser) {
        user.receive(message, fromUser);
      }
    });
  }
}

// Colleague class (User)
class User {
  constructor(public name: string, private mediator: Mediator) {
    this.mediator.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(`${this.name} sends: ${message}`);
    this.mediator.sendMessage(message, this);
  }

  receive(message: string, fromUser: User): void {
    console.log(`${this.name} received from ${fromUser.name}: ${message}`);
  }
}

// Example usage:
const mediator = new ChatMediator();

const user1 = new User("Alice", mediator);
const user2 = new User("Bob", mediator);
const user3 = new User("Charlie", mediator);

user1.sendMessage("Hello everyone!");
user2.sendMessage("Hi Alice!");
user3.sendMessage("Hey all!");
