import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const { assignmentText, instructions } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(assignmentText + instructions);

        return NextResponse.json({ response_text: result.response.text() });
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to get response from gemini"}, {status: 500});
    }
}