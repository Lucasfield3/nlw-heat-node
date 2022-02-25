import { serverHttp } from "./app"


serverHttp.listen(4000 || process.env.PORT, () => {
    console.log('its running on port 4000', process.env.PORT)
})