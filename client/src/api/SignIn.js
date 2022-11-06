import {Authorization} from "./option";

export async function postDataForSignIn(email, pw) {
    return (await Authorization.post('/login', {username: email, password: pw})).data.user
}