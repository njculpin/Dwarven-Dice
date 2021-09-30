import { supabase } from '../../../utils/supabaseClient'

export default async function handler(req, res){
    const active_player = req.body.active_player
    const game_uid = req.body.game_uid
    const pid = req.body.pid

    if (active_player === pid){

        const { data, error } = await supabase.from('gamestates').select().match({game_uid: game_uid})
        const game = data[0]
    
        if (error){
            res.status(400).json({message: error})
        }
    
        if (game.p1_address){
            if (active_player === game.p1_address){
                if (game.p2_address){
                    setActivePlayer(game.p2_address, game_uid)
                } else if (game.p3_address) {
                    setActivePlayer(game.p3_address, game_uid)
                } else if (game.p4_address) {
                    setActivePlayer(game.p4_address, game_uid)
                } else if (game.p5_address) {
                    setActivePlayer(game.p5_address, game_uid)
                } else {
                    setActivePlayer(game.p1_address, game_uid)
                }
            }
        }
    
        if (game.p2_address){
            if (active_player === game.p2_address){
                if (game.p3_address){
                    setActivePlayer(game.p3_address, game_uid)
                } else if (game.p4_address) {
                    setActivePlayer(game.p4_address, game_uid)
                } else if (game.p5_address) {
                    setActivePlayer(game.p5_address, game_uid)
                } else if (game.p1_address) {
                    setActivePlayer(game.p1_address, game_uid)
                } else {
                    setActivePlayer(game.p2_address, game_uid)
                }
            }
        }
    
        if (game.p3_address){
            if (active_player === game.p3_address){
                if (game.p4_address){
                    setActivePlayer(game.p4_address, game_uid)
                } else if (game.p5_address) {
                    setActivePlayer(game.p5_address, game_uid)
                } else if (game.p1_address) {
                    setActivePlayer(game.p1_address, game_uid)
                } else if (game.p2_address) {
                    setActivePlayer(game.p2_address, game_uid)
                } else {
                    setActivePlayer(game.p3_address, game_uid)
                }
            }
        }
    
    
        if (game.p4_address){
            if (active_player === game.p4_address){
                if (game.p5_address){
                    setActivePlayer(game.p5_address, game_uid)
                } else if (game.p1_address) {
                    setActivePlayer(game.p1_address, game_uid)
                } else if (game.p2_address) {
                    setActivePlayer(game.p2_address, game_uid)
                } else if (game.p3_address) {
                    setActivePlayer(game.p3_address, game_uid)
                } else {
                    setActivePlayer(game.p4_address, game_uid)
                }
            }
        }
    
    
        if (game.p5_address){
            if (active_player === game.p5_address){
                if (game.p1_address){
                    setActivePlayer(game.p1_address, game_uid)
                } else if (game.p2_address) {
                    setActivePlayer(game.p2_address, game_uid)
                } else if (game.p3_address) {
                    setActivePlayer(game.p3_address, game_uid)
                } else if (game.p4_address) {
                    setActivePlayer(game.p4_address, game_uid)
                } else {
                    setActivePlayer(game.p5_address, game_uid)
                }
            }
        }
        
    }

    res.status(200).json({message:'success'})
}

async function setActivePlayer(active_player, game_uid){
    const { data, error } = await supabase
        .from('gamestates')
        .update({
            active_player: active_player,
            active_player_rolls: 1,
            die1_state: 0,
            die2_state: 0,
            die3_state: 0,
            die4_state: 0,
            die5_state: 0, 
            die6_state: 0,
            die7_state: 0,
            die8_state: 0
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            return error
        }
    return data
}