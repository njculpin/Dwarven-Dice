import { supabase } from '../../../../utils/supabaseClient'

export default async function handler(req, res){
    const game_uid = req.body.game_uid
    const die = req.body.die
    const color = req.body.color

    if (color === 'green'){
        console.log('pulled green')
        const { data, error } = await supabase.from('gamestates').update({green_mine:green_mine-1, green_table:green_table+1}).match({game_uid: game_uid})
        if (error){
            res.status(400).json({message:error})
        }
        spender(die, game_uid)
        res.status(200).json({message:data})
    }

    if (color === 'purple'){
        console.log('pulled purple')
        const { data, error } = await supabase.from('gamestates').update({purple_mine:purple_mine-1, purple_table:purple_table+1}).match({game_uid: game_uid})
        if (error){
            res.status(400).json({message:error})
        }
        spender(die, game_uid)
        res.status(200).json({message:data})
    }
    if (color === 'red'){
        console.log('pulled red')
        const { data, error } = await supabase.from('gamestates').update({red_mine:red_mine-1, red_table:red_table+1}).match({game_uid: game_uid})
        if (error){
            res.status(400).json({message:error})
        }
        spender(die, game_uid)
        res.status(200).json({message:data})
    }
    if (color === 'blue'){
        console.log('pulled blue')
        const { data, error } = await supabase.from('gamestates').update({blue_mine:blue_mine-1, blue_table:blue_table+1}).match({game_uid: game_uid})
        if (error){
            res.status(400).json({message:error})
        }
        spender(die, game_uid)
        res.status(200).json({message:data})
    }
    if (color === 'black'){
        console.log('pulled black')
        const { data, error } = await supabase.from('gamestates').update({black_mine:black_mine-1, black_table:black_table+1}).match({game_uid: game_uid})
        if (error){
            res.status(400).json({message:error})
        }
        spender(die, game_uid)
        res.status(200).json({message:data})
    }
}