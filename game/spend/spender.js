import { supabase } from '../../utils/supabaseClient'

export default async function handler(die, game_uid){
    if (die === 1){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die1_state: 1
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            return error
        }
        return data
    }
    if (die === 2){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die2_state: 1
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            return error
        }
        return data
    }
    if (die === 3){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die3_state: 1
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            return error
        }
        return data
    }
    if (die === 4){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die4_state: 1
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            return error
        }
        return data
    }
    if (die === 5){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die5_state: 1
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            return error
        }
        return data
    }
    if (die === 6){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die6_state: 1
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            return error
        }
        return data
    }
    if (die === 7){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die7_state: 1
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            return error
        }
        return data
    }
    if (die === 8){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die8_state: 1
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            return error
        }
        return data
    }
}