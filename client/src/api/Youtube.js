import {Channel, StatisticVideo, Video} from "./option";

export async function getSnippetFromAPI(type, keyword) {
    return (await Video.get('/search', {
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
    return (await Video.get('/search', {
        params: {
            relatedToVideoId: Vid,
            type: 'video',
        }
    })).data.items;
}

export async function getChannelDetails(Cid) {
    return (await Channel.get('/channels', {
        params: {
            id: Cid,
        }
    })).data.items;
}

export async function getChannelVideos(Cid, orderBy) {
    return (await Channel.get('/search', {
        params: {
            channelId: Cid,
            order: orderBy,
            maxResults: 5,
        }
    })).data.items;
}