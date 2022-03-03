import prisma from "../prisma"

class Get3LastMessagesService {
    async execute() {
        
        const messages = await prisma.message.findMany({
            take:3,
            orderBy:{
                created_at:"desc"
            },
            include:{
                user: true
            }
        })

        return messages

    }
}

export  {Get3LastMessagesService}