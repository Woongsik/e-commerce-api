import express, { Request, Response } from 'express';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  avatar: string;
  address: string;
};

let users: User[] = [
  {
    id: '1',
    name: 'Ganesh',
    email: 'user1@mail.com',
    password: 'user1pasword',
    role: 'customer',
    avatar: 'user1Avatar',
    address: 'user1Address',
  },
  {
    id: '2',
    name: 'Roshan',
    email: 'user2@mail.com',
    password: 'user2pasword',
    role: 'customer',
    avatar: 'user2Avatar',
    address: 'user2Address',
  },
  {
    id: '3',
    name: 'Woong',
    email: 'user3@mail.com',
    password: 'user3pasword',
    role: 'customer',
    avatar: 'user3Avatar',
    address: 'user3Address',
  },
];

type passwordUpdte = {
  username: string;
  oldPassword: string;
  newPassword: string
}

const router = express.Router();

const findUserIndex = (userId: string): number => {
  return users.findIndex((user: User) => user.id === userId);
}

router.put("/:userId", (request: Request, response: Response) => { // update user profile
  // Update user profile (first name, last name, email)
  const userId: string = request.params.userId;
  const userInfo: User = request.body;

  if (userId) {
    const matchedIndex: number = findUserIndex(userId);
    if (matchedIndex > -1) {
      users[matchedIndex] = {
        ...users[matchedIndex],
        ...userInfo
      }

      return response.status(201).json(users[matchedIndex]);
    }
  } 
  
  return response.status(400).json({ message: "Not valid user"});
});

router.get("/:userId", (request: Request, response: Response) => { // forget password request
  const userId: string = request.params.userId;
  const newPassword: string = "0000";

  if (userId) {
    const matchedIndex: number = findUserIndex(userId);
    if (matchedIndex > -1) {
      const existedUser: User = users[matchedIndex];
      existedUser.password = newPassword;
      users[matchedIndex] = existedUser;

      return response.status(200).json({ message: `Successfully reset the password, ${newPassword}. Please change the password once you login!`});
    }
  }

  return response.status(400).json({ message: "Not valid user"});
});

router.post("/:userId", (request: Request, response: Response) => { // change password
  // Change password (username, old password, new password)
  const userId: string = request.params.userId;
  const passwordInfo: passwordUpdte = request.body;

  if (userId) {
    const matchedIndex: number = findUserIndex(userId);
    if (matchedIndex > -1) {
      const existedUser: User = users[matchedIndex];
      if (existedUser && existedUser.password === passwordInfo.oldPassword) {
        existedUser.password = passwordInfo.newPassword;
        users[matchedIndex] = existedUser;

        return response.status(200).json({ message: "The password successfully changed!"});
      } 
      
      return response.status(400).json({ message: "The password is wrong!"});
    } 
  }
  
  return response.status(400).json({ message: "Not valid user!"});
});



export default router;