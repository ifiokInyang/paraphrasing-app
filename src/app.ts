import express, { Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import axios from "axios";
const { Configuration, OpenAIApi } = require("openai");
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));

app.get("/", async (req: Request, res: Response) => {
  const text = `Dear Sir, 
Thank you for the opportunity of applying for this internship role at your company. As someone who is highly focused and attentive to detail, I thrive on building quality software applications that surpass end users' expectations. I'm thrilled at the opportunity to contribute my technical expertise and leadership experience as part of your engineering team.
In my current role at Decagon Limited, I develop innovative solutions across a variety of software platforms. I led a team of engineers to develop a user-friendly e-commerce web application that enables entrepreneurs to easily sell their products.`;
  const prompt = `Paraphrase the following text: ${text}`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 2024,
  });
  const ressd = response.data.choices[0].text.trim();
  console.log("res is ", ressd);
  res.status(200).json({
    prompt: text,
    ressd,
  });
});

const PORT = process.env.PORT || 4343;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
