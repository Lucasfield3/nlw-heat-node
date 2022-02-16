import { serverHttp } from "./app"


serverHttp.listen(4000, () => {
    console.log('its running on port 4000')
})