import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import JSON5 from 'json5';
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { courseJson, name, courseId } = await req.json()
  const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

  //     const PROMPT = `You are an expert course content generator.

  // Based on the given input (including chapter name and list of topics), generate high-quality, educational HTML content for each topic.

  // The course is about: ${name}

  // Output Rules:
  // - Return ONLY a **valid JSON array**.
  // - Each object must follow this schema:
  //   {
  //     "chapterName": "string",
  //     "topic": "string", 
  //     "content": "string (HTML-formatted content, escaped properly for JSON)"
  //   }
  // - Do NOT include code block markers like \`\`\`json or \`\`\`.
  // - Do NOT include any explanations or comments.
  // - Escape special characters properly (e.g. newlines as \\n).
  // - Make sure the content is specifically relevant to ${name}

  // Input Data:
  // `;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const promises = courseJson?.allchapters?.map(async (chapter) => {
    const PROMPT = `You are an expert course content generator.

Based on the given chapter information, generate high-quality, educational HTML content for EACH topic in the topics array.

The course is about: ${name}
Chapter Name: ${chapter.chapterName}
Topics to cover: ${JSON.stringify(chapter.topics)}

IMPORTANT OUTPUT RULES:
- Return ONLY a valid JSON array with NO extra text or explanations
- Create ONE object for EACH topic in the topics array
- Each object must follow this exact schema:
  {
    "chapterName": "${chapter.chapterName}",
    "topic": "exact topic name from the topics array",
    "content": "detailed HTML-formatted educational content for this specific topic"
  }
- Do NOT include \`\`\`json or \`\`\` markers
- Do NOT include any explanations before or after the JSON
- Escape special characters properly (quotes as \", newlines as \\n)
- Make sure content is specifically about the individual topic, not the entire chapter
- Generate substantial, educational content (at least 200-300 words per topic)

Example format:
[
  {
    "chapterName": "${chapter.chapterName}",
    "topic": "First Topic Name",
    "content": "<h2>First Topic Name</h2><p>Detailed content...</p>"
  },
  {
    "chapterName": "${chapter.chapterName}", 
    "topic": "Second Topic Name",
    "content": "<h2>Second Topic Name</h2><p>Detailed content...</p>"
  }
]

Generate content for these topics: ${JSON.stringify(chapter.topics)}
`;

    let ResJson = [];
    try {
      const result = await model.generateContent(PROMPT + JSON.stringify(chapter));
      const response = await result.response;
      const text = response.text();

      const rowRES = text
      const rowJSON = rowRES
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/\r/g, '')
        .replace(/\u0000/g, '')
        .trim();

      ResJson = JSON5.parse(rowJSON);
      if (!Array.isArray(ResJson)) {
        console.warn("⚠️ Gemini returned invalid courseData structure, defaulting to empty array");
        ResJson = [];
      }
    } catch (e) {
      console.error("❌ Gemini generation error:", e.message);
      // Continue with empty content or handle appropriately
    }


    let youtubeData = []
    try {
      youtubeData = await getYoutubeVideo(chapter?.chapterName)
    } catch (e) {
      console.error("Failed to fetch YouTube videos:", e)
    }

    console.log({
      youtubeVideo: youtubeData,
      // courseData: ResJson // Suppress huge log
    })
    return {
      youtubeVideo: youtubeData,
      courseData: ResJson
    }
  })

  const courseContent = await Promise.all(promises)

  //save to databse
  const saveData = await db.update(coursesTable).set({
    courseContent: JSON.stringify(courseContent)
  }).where(eq(coursesTable.cid, courseId))

  return NextResponse.json({ courseContent: courseContent, name: name })
}

const getYoutubeVideo = async (topic) => {
  try {
    console.log(`Fetching YouTube video for topic: ${topic}`);
    console.log(`Using API Key: ${process.env.YOUTUBE_API ? `Key exists (${process.env.YOUTUBE_API.slice(0, 5)}...)` : "Key MISSING"}`);

    const params = {
      part: "snippet",
      q: topic,
      maxResults: 4,
      type: "video",
      key: process.env.YOUTUBE_API
    }

    const resp = await axios.get(YOUTUBE_BASE_URL, { params })

    const youtubeListRes = resp.data.items;
    const youtubeList = []
    youtubeListRes.forEach(item => {
      const data = {
        videoId: item?.id?.videoId,
        title: item?.snippet?.title
      }
      youtubeList.push(data)

    });
    console.log(`Success! Found ${youtubeList.length} videos for topic: ${topic}`);
    return youtubeList
  } catch (error) {
    console.error(`Error in getYoutubeVideo: ${JSON.stringify(error?.response?.data || error.message)}`);
    return [];
  }
}



