import axios from "axios"

const KEY = 'AIzaSyBQIxJO49_Cvyek5k5vCDJ04nCSkGHNQy8'

export function Youtube(type, maxResult) {
    return axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3",
        params: {
            part: "snippet",
            key: KEY,
            type: type,
            maxResults: maxResult
        },
    })
}

export function StatisticVideo() {
    return axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3",
        params: {
            part: "statistics",
            key: KEY,
        },
    })
}