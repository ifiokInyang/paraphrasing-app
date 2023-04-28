"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const { Configuration, OpenAIApi } = require("openai");
dotenv_1.default.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.get("/", async (req, res) => {
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
