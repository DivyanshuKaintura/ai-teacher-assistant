import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { file } = await req.json(); // Receive PDF in base64 format
        const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY; // Store API key in .env file
        const visionAPIUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        const requestBody = {
            requests: [
                {
                    image: {
                        content: file, // Use the entire base64 string of the file
                    },
                    features: [
                        {
                            type: "DOCUMENT_TEXT_DETECTION", // Use DOCUMENT_TEXT_DETECTION for better document text extraction
                        },
                    ],
                },
            ],
        };

        console.log('File: ', file);
        console.log(requestBody);

        const response = await fetch(visionAPIUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        // Parse the response from the Vision API
        const data = await response.json();
        const extractedText =
            data.responses[0]?.fullTextAnnotation?.text ||
            "No text detected"; // Fallback text in case nothing is detected

        // Return the extracted text
        // create delay to see the console.log
        await new Promise(resolve => setTimeout(resolve, 5000));
        return NextResponse.json({ text: "text" });
    } catch (error) {
        console.error("Vision API Error:", error);
        return NextResponse.json(
            { error: "Failed to process file", details: (error as Error).message },
            { status: 500 }
        );
    }
}
