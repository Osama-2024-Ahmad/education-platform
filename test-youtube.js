require('dotenv').config();
const axios = require('axios');

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

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
        console.log(JSON.stringify(youtubeList, null, 2));
        return youtubeList
    } catch (error) {
        console.error(`Error in getYoutubeVideo: ${JSON.stringify(error?.response?.data || error.message)}`);
        return [];
    }
}

// Test with the chapter name from the user's issue
getYoutubeVideo("Chapter 1: Introduction to Node.js");
