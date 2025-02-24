import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import telegramBot from "node-telegram-bot-api";

import { DataSource } from "typeorm";
import { Student } from "./entity/student.entity";
import { Teacher } from "./entity/teacher.entity";
import { Class } from "./entity/class.entity";

dotenv.config();

const app = express();
const token = process.env.TELEGRAM_TOKEN || "";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use("/api/students", student)
// app.use("/api/teachers", teacher)
// app.use("/api/classes", classRoute)

const bot = new telegramBot(token, { polling: true });

// Define the command list
const commands = [
  { command: "/start", description: "Start the bot and get command list" },
  { command: "/student", description: "Get list of students" },
  { command: "/teacher", description: "Get list of teachers" },
  { command: "/class", description: "Get list of class" },
];

bot
  .setMyCommands(commands)
  .then(() => console.log("Commands set successfully"));

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  let response = "Hello from Leakhena_Bot, how can I help you?\n\n";
  commands.forEach((cmd) => {
    response += `${cmd.command} - ${cmd.description}\n`;
  });
  bot.sendMessage(chatId, response);
});

// Handle other commands
bot.onText(/\/student/, async (msg) => {
  const studentRepo = AppDataSource.getRepository(Student);
  const students = await studentRepo.find({
    take: 10,
  });

  const studentList = students
    .map((student, index) => {
      return `${index + 1}. ${student.first_name} ${student.last_name}`;
    })
    .join("\n");

  bot.sendMessage(
    msg.chat.id,
    `Students Name📝\n\n${studentList}` 
  );
});

bot.onText(/\/teacher/, async (msg) => {
  const teacherRepo = AppDataSource.getRepository(Teacher);
  const teachers = await teacherRepo.find({
    take: 10,
  });
  const teacherList = teachers
    .map((teacher, index) => {
      return `${index + 1}. ${teacher.first_name} ${teacher.last_name}`;
    })
    .join("\n");
  bot.sendMessage(msg.chat.id, `Teachers Name📝\n\n${teacherList}`);
});

bot.onText(/\/class/, async (msg) => {
  const classRepo = AppDataSource.getRepository(Class);
  const classes = await classRepo.find({
    take: 10,
    });
    const classList = classes
    .map((cls, index) => {
      return `${index + 1}. ${cls.class_name}`;
      })
      .join("\n");
      bot.sendMessage(msg.chat.id, `Class Name📝\n\n${classList}`)
      });


// Start server
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  })
  .catch((error) => console.log(error));

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};

export default app;
