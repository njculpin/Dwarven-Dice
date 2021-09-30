import { supabase } from '../../utils/supabaseClient'

export default async function handler(req, res){
    const game_uid = req.body.game_uid
    const games = await removeGame(game_uid)
    console.log(games)
    const states = await removeGamestates(game_uid)
    console.log(states)
    res.status(200).json({message:'success'})
}

async function removeGamestates(game_uid){
    const { data, error } = await supabase
    .from('games')
    .delete()
    .match({ game_uid: game_uid })
    if (error){
        return error
    }
    return data
}

async function removeGame(game_uid){
    const { data, error } = await supabase
    .from('gamestates')
    .delete()
    .match({ game_uid: game_uid })
    if (error){
        return error
    }
    return data
}