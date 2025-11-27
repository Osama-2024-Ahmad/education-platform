import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Note: The SDK doesn't have a direct listModels method on the client instance in some versions, 
    // but we can try to use the API directly or check documentation. 
    // Actually, for @google/generative-ai, we might need to use the model to generate content to test, 
    // but the error message suggested calling ListModels. 
    // Let's try to use the API endpoint directly with axios since I know the key.

    // Wait, I can't easily use axios with the key if I don't import it.
    // Let's just try to run a simple generation with 'gemini-pro' to see if that works.

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("gemini-pro works!");
    } catch (e) {
        console.log("gemini-pro failed:", e.message);
    }
}

listModels();
