import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    const token =  request.headers['x-access-token']

    if(!token){
        return response.status(401).json({errorCode: 'token invalid!'})
    }

    // const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(String(token), process.env.JWT_SECRET) as IPayload

        request.user_id = sub

        response.json({token:token})

        return next()
    } catch (error) {
        return response.status(401).json({errorCode: 'token invalid!'})
    }

}

export default ensureAuthenticated