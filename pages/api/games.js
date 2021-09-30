import { supabase } from '../../utils/supabaseClient'

export default async function handler(req, res){
    const {data, error} = await supabase.from('games').select()
    if (error){
        res.status(400).json({message:error})
    }
    res.status(200).json({message:data})
}