import {Authorization} from "./option";

export async function postDataForSignUp(email, un, pw) {
    return (await Authorization.post('/register', {username: un, email: email, password: pw})).data.user
}