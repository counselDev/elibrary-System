const notFoundMiddleware = (req, res) =>{
    return res.status(404).send("Route does not exist");
}


export default notFoundMiddleware;