import axios from "axios";

const instance = axios.create({
  baseURL: 'https://money-handler-ddef2-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default instance