import { supabase } from '../../utils/supabaseClient'

export default async function handler(req, res){
    const player_data = req.body.player_data
    const { data, error } = await supabase.from('players').select().match({address: player_data.address})
    if (error){
        res.status(400).json({message: JSON.stringify(error)})
    }
    if (data.length >= 1){
        res.status(200).json({message: 'player already exists'})
    } else {
        return saveNewPlayer(player_data)
    }
}

const saveNewPlayer = async (player_data) => {
    const { data, error } = await supabase.from('players').insert(player_data)
    if (error){
        return res.status(400).json({message: JSON.stringify(error)})
    }
    return res.status(200).json({message: data})
}