import { GoogleGenerativeAI } from "@google/generative-ai";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

// Better fallback generator
function generateFallbackQuestion(grade, subject, topic) {
    const gradeNum = parseInt(grade.replace("Grade ", "")) || 5;

    // Math Fallback (Real calculation)
    if (subject === "Math") {
        const isAdvanced = gradeNum > 5;
        const n1 = getRandomInt(2, isAdvanced ? 20 : 10);
        const n2 = getRandomInt(2, isAdvanced ? 20 : 10);

        let question, answer;

        if (topic.includes("Algebra") || isAdvanced) {
            // Generate: Solve for x: ax + b = c
            const x = getRandomInt(1, 10);
            const a = getRandomInt(2, 5);
            const b = getRandomInt(1, 20);
            const c = a * x + b;
            question = `Solve for $x$: $${a}x + ${b} = ${c}$`;
            answer = String(x);
        } else {
            // Basic Arithmetic
            question = `Calculate: $${n1} \\times ${n2}$`;
            answer = String(n1 * n2);
        }

        const options = new Set([answer]);
        while (options.size < 4) {
            const val = parseInt(answer) + getRandomInt(-5, 5);
            if (val !== parseInt(answer) && val > 0) options.add(String(val));
        }

        return {
            question,
            answer,
            options: shuffleArray(Array.from(options)),
            explanation: "This is a generated practice question."
        };
    }

    // Generic Fallback for other subjects
    return {
        question: `Which of the following is a key concept in ${grade} ${subject} - ${topic}?`,
        answer: "Critical Thinking",
        options: shuffleArray(["Critical Thinking", "Rote Memorization", "Random Guessing", "Ignoring Facts"]),
        explanation: "Critical thinking is essential for understanding this subject."
    };
}

export async function generateQuestions(grade, subject, topic, count = 5) {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    // Debug log to check if key exists (don't log the actual key)
    console.log("v4.0 - Using Groq (Llama 3.3 70B) - Ultra Fast!");
    console.log("🔑 API Key Status:", apiKey ? "Present" : "Missing");

    // If no API key, use fallback
    if (!apiKey || apiKey.includes("your_groq_api_key")) {
        console.warn("⚠️ No valid Groq API key. Using fallback.");
        return Array.from({ length: count }, () => generateFallbackQuestion(grade, subject, topic));
    }

    // Single Batch Strategy for Speed
    // We fetch all questions in one go to reduce network latency.
    const BATCH_SIZE = count;
    const promises = [];

    console.log(`🚀 Starting generation for ${count} questions...`);

    // Just one batch
    promises.push(fetchBatch(apiKey, grade, subject, topic, count));

    try {
        const results = await Promise.all(promises);
        // Flatten the array of arrays
        const allQuestions = results.flat();

        console.log(`✅ Successfully generated ${allQuestions.length} questions in parallel!`);
        return allQuestions;

    } catch (error) {
        console.error("❌ Error in parallel generation:", error);
        console.log("⚠️ Falling back to basic questions");
        return Array.from({ length: count }, () => generateFallbackQuestion(grade, subject, topic));
    }
}

async function fetchBatch(apiKey, grade, subject, topic, count) {
    try {
        // Add a random seed to ensure diversity across parallel requests
        const seed = Math.random().toString(36).substring(7);

        const prompt = `You are an expert educator creating exam questions for US students.

Generate ${count} multiple-choice questions for:
- Grade: ${grade}
- Subject: ${subject}
- Topic: ${topic}
- ID: ${seed}

RULES:
1. Align with BASIS Charter School standards (rigorous)
2. Test conceptual understanding
3. Label options A), B), C), D)
4. For math: use $...$ for inline math (e.g., $x^2$)
5. NEVER use \\begin{pmatrix} or any LaTeX matrix environment!
6. For 2x2 matrices, write them in plain text like this: 
   "the matrix with first row [2, 1] and second row [4, 3]"
   Or: "matrix A where a₁₁=2, a₁₂=1, a₂₁=4, a₂₂=3"
7. For Chinese/Mandarin: use actual characters (你好, 谢谢)
8. Keep explanations SHORT (1-2 sentences)

Return ONLY valid JSON:
[{"question": "...", "options": ["A) ...", "B) ...", "C) ...", "D) ..."], "answer": "A) ...", "explanation": "..."}]`;

        // Direct API call using Groq
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a quiz generator. Return ONLY valid JSON. NEVER use LaTeX matrix commands like \\begin{pmatrix}. Keep explanations under 30 words.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2500
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0]?.message?.content) {
            throw new Error('Invalid API response structure');
        }

        let text = data.choices[0].message.content;

        // --- ROBUST JSON CLEANING ---
        const cleanJSON = (str) => {
            // 1. Remove markdown
            let s = str.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            // 2. Extract array
            const first = s.indexOf('[');
            const last = s.lastIndexOf(']');
            if (first !== -1 && last !== -1) {
                s = s.substring(first, last + 1);
            }

            // 3. Protect valid escapes
            const placeholders = {
                '\\\\': '___DOUBLE_BACKSLASH___',
                '\\"': '___ESCAPED_QUOTE___',
                '\\/': '___FORWARD_SLASH___'
            };

            for (const [key, val] of Object.entries(placeholders)) {
                s = s.split(key).join(val);
            }

            // 4. Escape any remaining backslashes
            s = s.replace(/\\/g, '\\\\');

            // 5. Restore placeholders
            for (const [key, val] of Object.entries(placeholders)) {
                s = s.split(val).join(key);
            }

            // 6. Fix specific common issues
            const commonCommands = ['frac', 'neq', 'sqrt', 'cdot', 'approx', 'leq', 'geq', 'infty'];

            commonCommands.forEach(cmd => {
                const regex = new RegExp(`([^a-zA-Z0-9\\\\])${cmd}(?![a-zA-Z])`, 'g');
                s = s.replace(regex, `$1\\\\${cmd}`);

                const startRegex = new RegExp(`^${cmd}(?![a-zA-Z])`);
                if (startRegex.test(s)) {
                    s = '\\\\' + s;
                }
            });

            // 7. Fix malformed fractions
            s = s.replace(/\\\\frac\s?(\d)(\d)/g, '\\\\frac{$1}{$2}');

            // 8. Fix JSON Syntax Errors
            s = s.replace(/,(\s*[\]}])/g, '$1');
            s = s.replace(/([{,]\s*)([a-zA-Z0-9_]+?)\s*:/g, '$1"$2":');

            return s;
        };

        const cleanedText = cleanJSON(text);

        let questions;
        try {
            questions = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("JSON Parse Error. Raw text:", text);
            console.error("Cleaned text:", cleanedText);
            throw parseError;
        }

        // Validate structure
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error("Invalid response structure");
        }

        // Validate each question
        const validQuestions = questions.filter(q =>
            q.question &&
            Array.isArray(q.options) &&
            q.options.length === 4 &&
            q.answer &&
            q.options.includes(q.answer)
        );

        if (validQuestions.length === 0) {
            throw new Error("No valid questions generated");
        }

        // Post-process to fix LaTeX delimiters and Unicode escapes
        const fixText = (str) => {
            if (!str) return str;
            // Convert \( \) to $ $ for KaTeX
            let fixed = str.replace(/\\\(/g, '$').replace(/\\\)/g, '$');
            // Convert \[ \] to $$ $$ for display math
            fixed = fixed.replace(/\\\[/g, '$$').replace(/\\\]/g, '$$');
            // Decode Unicode escapes like \u767e to actual characters
            fixed = fixed.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
                String.fromCharCode(parseInt(hex, 16))
            );
            // Fix matrix row breaks - the model often outputs single backslash or escaped backslash
            // We need \\\\ in the string (which becomes \\ when rendered by KaTeX)
            // First, normalize any \\\\  to \\ (in case of over-escaping)
            fixed = fixed.replace(/\\\\\\\\/g, '\\\\');
            return fixed;
        };

        // Apply fixes to all text fields
        const fixedQuestions = validQuestions.map(q => ({
            ...q,
            question: fixText(q.question),
            options: q.options.map(opt => fixText(opt)),
            answer: fixText(q.answer),
            explanation: fixText(q.explanation)
        }));

        return fixedQuestions.slice(0, count);

    } catch (error) {
        console.error("Error in fetchBatch:", error);
        throw error; // Re-throw to be caught by Promise.all or handled above
    }
}
