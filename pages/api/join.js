import { supabase } from '../../utils/supabaseClient'
import axios from 'axios'

export default async function handler(req, res){
    const code = req.body.code
    const user = req.body.userid
    const { data, error } = await supabase.from('games').select().match({gameuid: code})
    /*
    if (error){
        res.status(400).json({message: error})
    }
    if (data.p1){
        if (data.p2){
            if (data.p3){
                if (data.p4) {
                    if (data.p5){
                        res.status(400).json({message: 'no seats'})
                    } else {
                        res.status(200).json({message: data, uuid: 'sit at 5'})
                    }
                } else {
                    res.status(200).json({message: data, uuid: 'sit at 4'})
                }
            } else {
                res.status(200).json({message: data, uuid: 'sit at 3'})
            }
        } else {
            res.status(200).json({message: data, uuid: 'sit at 2'})
        }
    } else {
        res.status(400).json({message: 'missing host'})
    }
    */
    res.status(200).json({message: data, uuid: req.body})
}