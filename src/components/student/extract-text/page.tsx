import React from "react";
import pdfjsLib from "pdfjs-dist";

const extractTextFromPDF = async (file: File) => {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
        reader.onload = async (event) => {
            try {
                const pdfData = new Uint8Array(event.target?.result as ArrayBuffer);
                const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
                let extractedText = "";
                for (let i = 0; i < pdf.numPages; i++) {
                    const page = await pdf.getPage(i + 1);
                    const textContent = await page.getTextContent();
                    textContent.items.forEach((item) => {
                        if ("str" in item) {
                            extractedText += item.str + " ";
                        }
                    });
                }
                resolve(extractedText);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = () => reject("Failed to read the file.");
        reader.readAsArrayBuffer(file);
    });
}

