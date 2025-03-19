import { config } from "dotenv";
config();

import OpenAI from "openai";
const openai = new OpenAI();

export default openai;