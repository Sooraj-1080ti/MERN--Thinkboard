import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res,next) => {
    try {
        const {success} = await ratelimit.limit("My-Limit-Key");// as there is no user auth my limit key string is passed

        if(!success){
            return res.status(429).json({message:"Too many request, Please try again later"});
        }

        next();
    } catch (error) {
        console.log("Ratelimit error",error)
        next(error);
    }
}

export default rateLimiter;