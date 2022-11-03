import {Youtube, StatisticVideo, getVideoSnippet} from "../utils/configAPI";

export async function getAPI(keyword, type, maxResult) {
    return await new Promise((resolve, reject) => {
        Youtube(type, maxResult).get('/search', {
            params: {
                q: keyword
            }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

export async function statisticVideo(videoId) {
    return await new Promise((resolve, reject) => {
        StatisticVideo().get('/videos', {
            params: {
                id: videoId,
            }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

export async function getVideoDetails(videoId) {
    return await new Promise((resolve, reject) => {
        getVideoSnippet().get('/videos', {
            params: {
                id: videoId,
            }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}