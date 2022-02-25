import { Request, Response } from 'express'
import { Get3LastMessagesService } from '../services/Get3LastMessagesService'


class Get3LastMessagesController{
    async handle(request:Request, response:Response){

        const service = new Get3LastMessagesService()
Get3LastMessagesController
        const result = await service.execute()

        return response.json(result)

    }
}

export default Get3LastMessagesController