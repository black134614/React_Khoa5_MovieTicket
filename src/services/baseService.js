import Axios from "axios"
import {DOMAIN,TOKEN} from '../util/settings/config'

export class baseService {
    //put json về phía backend
    put = (url,model) => {
        return  Axios({
            url:`${DOMAIN}${url}`,
            method:'PUT',
            data:model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN),
            "Access-Control-Allow-Origin": "*"} //JWT
        }) 
    }

    post = (url,model) => {
        return Axios({
            url:`${DOMAIN}${url}`,
            method:'POST',
            data:model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN),"Access-Control-Allow-Origin": "*"} //JWT
        }) 
    }


    get = (url) => {
        return Axios({
            url:`${DOMAIN}${url}`,
            method:'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN),"Access-Control-Allow-Origin": "*"} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }

    delete = (url) => {
        return Axios({
            url:`${DOMAIN}${url}`,
            method:'DELETE',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN),"Access-Control-Allow-Origin": "*"} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }
}