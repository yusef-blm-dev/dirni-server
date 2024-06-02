import "dotenv/config";
import { db } from "./libs/dbConnect.js";

const users = [
  {
    username: "user1",
    email: "user1@example.com",
    password: "$2b$10$N9cxX0pj9YEOuHRjUBi0J.dRk9VtdkE4B2Axz.JP9Wb7iu1cKZU8a",
    avatar:
      "https://scontent.frba4-2.fna.fbcdn.net/v/t39.30808-1/416885673_122094522380182685_6463636824797560236_n.jpg?stp=c0.11.200.200a_dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG_unnWPh9DSNYyUQT5PEN1K0Ok26f4SMYrQ6Tbp_hIxuweyF-G8MtF1U0a8HuiwCwYk6fFDxJe8rVCFxc2enPO&_nc_ohc=JENq2RRL4i0Q7kNvgHvK6px&_nc_ht=scontent.frba4-2.fna&oh=00_AYAIP1crpJr22O0muylFUroRjo1CXlpRbVcdElojDODmlQ&oe=664FE8ED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    username: "user2",
    email: "user2@example.com",
    password: "$2b$10$N9cxX0pj9YEOuHRjUBi0J.dRk9VtdkE4B2Axz.JP9Wb7iu1cKZU8a",
    avatar:
      "https://scontent.frba4-2.fna.fbcdn.net/v/t39.30808-1/416885673_122094522380182685_6463636824797560236_n.jpg?stp=c0.11.200.200a_dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG_unnWPh9DSNYyUQT5PEN1K0Ok26f4SMYrQ6Tbp_hIxuweyF-G8MtF1U0a8HuiwCwYk6fFDxJe8rVCFxc2enPO&_nc_ohc=JENq2RRL4i0Q7kNvgHvK6px&_nc_ht=scontent.frba4-2.fna&oh=00_AYAIP1crpJr22O0muylFUroRjo1CXlpRbVcdElojDODmlQ&oe=664FE8ED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const tasks = [
  {
    name: "Task 1 for User 1",
    description: "Description for Task 1 for User 1",
    priority: "High",
    due: new Date().toISOString(),
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: "Task 2 for User 1",
    description: "Description for Task 2 for User 1",
    priority: "Medium",
    due: new Date().toISOString(),
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: "Task 1 for User 2",
    description: "Description for Task 1 for User 2",
    priority: "High",
    due: new Date().toISOString(),
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: "Task 2 for User 2",
    description: "Description for Task 2 for User 2",
    priority: "Low",
    due: new Date().toISOString(),
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

try {
  // Seed users
  const userCollection = db.collection("users");
  await userCollection.insertMany(users);
  console.log("Users seeded successfully");

  // Assign tasks to users
  const tasksWithUserId = tasks.map((task, index) => ({
    ...task,
    owner: index < 2 ? users[0]._id : users[1]._id,
  }));

  // Seed tasks
  const taskCollection = db.collection("tasks");
  await taskCollection.insertMany(tasksWithUserId);
  console.log("Tasks seeded successfully");
} catch (err) {
  console.error("Error seeding database:", err);
}

process.exit();
