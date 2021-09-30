import { supabase } from '../../../utils/supabaseClient'

export default async function handler(req, res){
    const active_player = req.body.active_player
    const game_uid = req.body.game_uid
    const pid = req.body.pid

    if (active_player === pid){

        const { data, error } = await supabase.from('gamestates').select().match({game_uid: game_uid})
        const game = data[0]

        const turn = game.turns
    
        if (error){
            res.status(400).json({message: error})
        }
    
        if (game.p1_address){
            if (active_player === game.p1_address){
                if (game.p2_address){
                    setActivePlayer(game.p2_address, game_uid, turn)
                } else if (game.p3_address) {
                    setActivePlayer(game.p3_address, game_uid, turn)
                } else if (game.p4_address) {
                    setActivePlayer(game.p4_address, game_uid, turn)
                } else if (game.p5_address) {
                    setActivePlayer(game.p5_address, game_uid, turn)
                } else {
                    setActivePlayer(game.p1_address, game_uid, turn)
                }
            }
        }
    
        if (game.p2_address){
            if (active_player === game.p2_address){
                if (game.p3_address){
                    setActivePlayer(game.p3_address, game_uid, turn)
                } else if (game.p4_address) {
                    setActivePlayer(game.p4_address, game_uid, turn)
                } else if (game.p5_address) {
                    setActivePlayer(game.p5_address, game_uid, turn)
                } else if (game.p1_address) {
                    setActivePlayer(game.p1_address, game_uid, turn)
                } else {
                    setActivePlayer(game.p2_address, game_uid, turn)
                }
            }
        }
    
        if (game.p3_address){
            if (active_player === game.p3_address){
                if (game.p4_address){
                    setActivePlayer(game.p4_address, game_uid, turn)
                } else if (game.p5_address) {
                    setActivePlayer(game.p5_address, game_uid, turn)
                } else if (game.p1_address) {
                    setActivePlayer(game.p1_address, game_uid, turn)
                } else if (game.p2_address) {
                    setActivePlayer(game.p2_address, game_uid, turn)
                } else {
                    setActivePlayer(game.p3_address, game_uid, turn)
                }
            }
        }
    
    
        if (game.p4_address){
            if (active_player === game.p4_address){
                if (game.p5_address){
                    setActivePlayer(game.p5_address, game_uid, turn)
                } else if (game.p1_address) {
                    setActivePlayer(game.p1_address, game_uid, turn)
                } else if (game.p2_address) {
                    setActivePlayer(game.p2_address, game_uid, turn)
                } else if (game.p3_address) {
                    setActivePlayer(game.p3_address, game_uid, turn)
                } else {
                    setActivePlayer(game.p4_address, game_uid, turn)
                }
            }
        }
    
    
        if (game.p5_address){
            if (active_player === game.p5_address){
                if (game.p1_address){
                    setActivePlayer(game.p1_address, game_uid, turn)
                } else if (game.p2_address) {
                    setActivePlayer(game.p2_address, game_uid, turn)
                } else if (game.p3_address) {
                    setActivePlayer(game.p3_address, game_uid, turn)
                } else if (game.p4_address) {
                    setActivePlayer(game.p4_address, game_uid, turn)
                } else {
                    setActivePlayer(game.p5_address, game_uid, turn)
                }
            }
        }
        
    }

    res.status(200).json({message:'success'})
}

async function setActivePlayer(active_player, game_uid, turn){
    const { data, error } = await supabase
        .from('gamestates')
        .update({
            turns: turn+1,
            active_player: active_player,
            secondary_player: '',
            active_player_rolls: 1,
            secondary_player_rolls: 0,
            die1_location: active_player,
            die2_location: active_player,
            die3_location: active_player,
            die4_location: active_player,
            die5_location: active_player,
            die6_location: active_player,
            die7_location: active_player,
            die8_location: active_player,
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