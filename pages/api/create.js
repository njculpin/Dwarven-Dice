import { supabase } from '../../utils/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res){
    const uuid = uuidv4()
    const host = req.body.userid

    const { data, error } = await supabase.from('games').insert({
        "host": host,
        "game_uid": uuid, 
        "players": 1,
        "p1_address": host,
        "p2_address": '',
        "p3_address": '',
        "p4_address": '',
        "p5_address": '',
        "winner": ''
    })

    if (error){ return res.status(400).json({message: error}) }
    res.status(200).json({message: data, game_uid: uuid, host: host})
}