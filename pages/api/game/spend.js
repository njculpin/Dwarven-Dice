export default async function handler(req, res){
    console.log(req.body.die)
    res.status(200).json({message:'success'})
}