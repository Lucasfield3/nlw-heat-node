import { Router } from 'express'
import { AuthenticateUserController } from './controller/AuthenticateUserController'
import CreateMessageController from './controller/CreateMessageController'
import Get3LastMessagesController from './controller/Get3LastMessagesController'
import { ProfileUserController } from './controller/ProfileUserController'
import ensureAuthenticated from './middleware/ensureAuthenticated'


const router = Router()

router.post('/authenticate', new AuthenticateUserController().handle)
router.post('/messages', ensureAuthenticated, new CreateMessageController().handle)

router.get('/messages/last-3', new Get3LastMessagesController().handle)
router.get('/profile', new ProfileUserController().handle)

export { router }
