let ENDPOINT = "http://localhost:4000"
if(process.env.NODE_ENV==="production"){
    ENDPOINT= "https://cureconnectfullsatck.onrender.com"
}

export default ENDPOINT;