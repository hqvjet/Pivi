import axios from "axios"

const REACT_APP_YOUTUBE_API_KEY = 'AIzaSyBQIxJO49_Cvyek5k5vCDJ04nCSkGHNQy8';
const REACT_APP_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const Youtube = axios.create({
    baseURL: REACT_APP_BASE_URL,
    params: {
        part: "snippet",
        key: REACT_APP_YOUTUBE_API_KEY,
        maxResults: 5
    },
});

export const StatisticVideo = axios.create({
    baseURL: REACT_APP_BASE_URL,
    params: {
        part: "statistics, snippet",
        key: REACT_APP_YOUTUBE_API_KEY,
    },
});
