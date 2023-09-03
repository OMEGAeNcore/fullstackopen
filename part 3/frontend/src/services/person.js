import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseURL);
    return req.then(res => res.data)
}

const create = (newPerson) => {
    const req = axios.post(baseURL, newPerson)
    return req.then(res => res.data)
}

const deleteNumber = (id) => {
    const req = axios.delete(`${baseURL}/${id}`)
    return req.then(res => res.data)
}

const update = (id, newPerson) => {
    const req = axios.put(`${baseURL}/${id}`, newPerson)
    return req.then(res => res.data)
}   

export default { getAll, create, deleteNumber, update };