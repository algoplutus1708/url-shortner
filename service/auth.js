import jwt from "jsonwebtoken"
const secretKey = "swastick@17"
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email
    },secret)
}

function getUser(token){
    if(!token) return null
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null
    }
}
export {setUser, getUser}