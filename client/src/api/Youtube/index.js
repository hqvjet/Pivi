import {StatisticVideo, Youtube} from "./option";

export async function getSnippetFromAPI(type, keyword) {
    if (keyword === 'New')
        keyword = ''

    return (await Youtube.get('/search', {
        params: {
            q: keyword,
            type: type,
        }
    })).data.items;
}

export async function getVideoDetails(Vid) {
    return (await StatisticVideo.get('/videos', {
        params: {
            id: Vid,
        }
    })).data.items;
}

export async function getRelatedVideo(Vid) {
    return (await Youtube.get('/search', {
        params: {
            relatedToVideoId: Vid,
            type: 'video',
        }
    })).data.items;
}