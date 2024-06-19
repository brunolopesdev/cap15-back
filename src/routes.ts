import { Router } from 'express'
import { createUsers, getUsers, loginUser } from "./controller/UserController";
const routes = Router()

routes.get('/users', getUsers)

routes.post('/users', createUsers)

routes.post("/login", loginUser);

export default routes