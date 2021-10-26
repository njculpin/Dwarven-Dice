import { supabase } from '../../utils/supabaseClient'
import spender from './spender'

export default async function handler(die, game_uid, color){

    const { data, error } = await supabase.from('gamestates').select().match({game_uid: game_uid})
    if (error){
        return error
    }

    const game = data[0]

    const green_mine = game.green_mine
    const purple_mine = game.purple_mine
    const red_mine = game.red_mine
    const blue_mine = game.blue_mine
    const black_mine = game.black_mine

    const green_table = game.green_table
    const purple_table = game.purple_table
    const red_table = game.red_table
    const blue_table = game.blue_table
    const black_table = game.black_table

    if (color === 'green'){
        console.log('pulled green')
        const { data, error } = await supabase.from('gamestates').update({green_mine:green_mine-1, green_table:green_table+1}).match({game_uid: game_uid})
        if (error){
            return error
        }
        spender(die, game_uid)
        return data
    }

    if (color === 'purple'){
        console.log('pulled purple')
        const { data, error } = await supabase.from('gamestates').update({purple_mine:purple_mine-1, purple_table:purple_table+1}).match({game_uid: game_uid})
        if (error){
            return error
        }
        spender(die, game_uid)
        return data
    }
    if (color === 'red'){
        console.log('pulled red')
        const { data, error } = await supabase.from('gamestates').update({red_mine:red_mine-1, red_table:red_table+1}).match({game_uid: game_uid})
        if (error){
            return error
        }
        spender(die, game_uid)
        return data
    }
    if (color === 'blue'){
        console.log('pulled blue')
        const { data, error } = await supabase.from('gamestates').update({blue_mine:blue_mine-1, blue_table:blue_table+1}).match({game_uid: game_uid})
        if (error){
            return error
        }
        spender(die, game_uid)
        return data
    }
    if (color === 'black'){
        console.log('pulled black')
        const { data, error } = await supabase.from('gamestates').update({black_mine:black_mine-1, black_table:black_table+1}).match({game_uid: game_uid})
        if (error){
            return error
        }
        spender(die, game_uid)
        return data
    }
}