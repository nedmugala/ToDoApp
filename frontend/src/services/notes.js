import axios from 'axios'
const baseUrl = "http://localhost:3000/api/notes"


function getAll(){
    const request = axios.get(baseUrl)
 
    return request.then(response=>{         
        return response.data})
}
function create (newObj){
    const request = axios.post(baseUrl, newObj)
    return request.then(response=> response.data)
}
function update(id, newObj){
    const request = axios.put(`${baseUrl}/:${id}`, newObj)
    return request.then(response => response.data)
}



export default{
    getAll,
    create,
    update
    
}


