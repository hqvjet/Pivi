import axios from "axios"

export async function Login(data) {
    console.log(data)
    return new Promise((resolve) => {
        axios
            .post('/auth/login', data)
            .then(res =>  {
                if(Number(res.data.status) === 1)
                    resolve('Wrong username or password, Please check again!')
                else if(Number(res.data.status) === 2)
                    resolve('Not allow empty input!')
            })
    })
    // console.log(data)
    // return new Promise(res => {
    //     setTimeout(() => {
    //         res('ok')
    //     }, 2000)
    //
    // })
}

export async function Register(data) {
    console.log(data)
    return new Promise(resolve => {
        axios
            .post('/auth/register', data)
            .then(res => {
                if(Number(res.data.status) === 1)
                    resolve('Account already existed')
                else if(Number(res.data.status) === 2)
                    resolve('Not allow empty input!')
                else
                    resolve('Congratulation, You have created an account!')
            })
    })

}