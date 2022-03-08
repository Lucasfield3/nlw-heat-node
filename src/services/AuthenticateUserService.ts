import axios from 'axios';
import prisma from '../prisma';
import { sign } from 'jsonwebtoken'

interface IAccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    avatar_url: string;
    id: number;
    name: string;
    login: string;
}

class AuthenticateUserService {

    async execute(code:string){

        const url = 'https://github.com/login/oauth/access_token'

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params:{
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers:{
                Accept: 'application/json',

            }
        })


        const response  =  await axios.get<IUserResponse>('https://api.github.com/user', {
            headers:{
                authorization: 'Bearer ' + accessTokenResponse.access_token,
                accessControlAllowOrigin:"*",
                credential: true
            }
        })

        const { login, avatar_url, id, name } = response.data

        let user = await prisma.user.findFirst({
            where:{
                github_id: id
            }
        })

        if(!user){
            user =  await prisma.user.create({
                data:{
                    login,
                    name,
                    github_id:id,
                    avatar_url,
                }
            })
        }

        const token = sign(
            {
                user:{
                    id:user.id
                },
            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn:'1d'
            }
        )
        
        return {token, user}

    }

}

export { AuthenticateUserService}