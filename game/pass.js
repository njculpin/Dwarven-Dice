import { supabase } from '../utils/supabaseClient'

export default async function pass(game_uid, active_player, pid){

    if (active_player === pid){

        const { data, error } = await supabase.from('gamestates').select().match({game_uid: game_uid}).single()
        const game = data

        const turn = game.turns

        let die1_face = randomFace()
        let die2_face = randomFace()
        let die3_face = randomFace()
        let die4_face = randomFace()
        let die5_face = randomFace()
        let die6_face = randomFace()
        let die7_face = randomFace()
        let die8_face = randomFace()

        const die1_state = game.die1_state
        if (die1_state === 2){
            die1_face = game.die1_face
        }
        const die2_state = game.die2_state
        if (die2_state === 2){
            die2_face = game.die2_face
        }
        const die3_state = game.die3_state
        if (die3_state === 2){
            die3_face = game.die3_face
        }
        const die4_state = game.die4_state
        if (die4_state === 2){
            die4_face = game.die4_face
        }
        const die5_state = game.die5_state
        if (die5_state === 2){
            die5_face = game.die5_face
        }
        const die6_state = game.die6_state
        if (die6_state === 2){
            die6_face = game.die6_face
        }
        const die7_state = game.die7_state
        if (die7_state === 2){
            die7_face = game.die7_face
        }
        const die8_state = game.die_state
        if (die8_state === 2){
            die8_face = game.die8_face
        }

        if (error){
            return error
        }
    
        if (game.p1_address){
            if (active_player === game.p1_address){
                if (game.p2_address){
                    setActivePlayer(game.p2_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p3_address) {
                    setActivePlayer(game.p3_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p4_address) {
                    setActivePlayer(game.p4_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p5_address) {
                    setActivePlayer(game.p5_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else {
                    setActivePlayer(game.p1_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                }
            }
        }
    
        if (game.p2_address){
            if (active_player === game.p2_address){
                if (game.p3_address){
                    setActivePlayer(game.p3_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p4_address) {
                    setActivePlayer(game.p4_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p5_address) {
                    setActivePlayer(game.p5_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p1_address) {
                    setActivePlayer(game.p1_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else {
                    setActivePlayer(game.p2_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                }
            }
        }
    
        if (game.p3_address){
            if (active_player === game.p3_address){
                if (game.p4_address){
                    setActivePlayer(game.p4_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p5_address) {
                    setActivePlayer(game.p5_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p1_address) {
                    setActivePlayer(game.p1_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p2_address) {
                    setActivePlayer(game.p2_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else {
                    setActivePlayer(game.p3_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                }
            }
        }
    
    
        if (game.p4_address){
            if (active_player === game.p4_address){
                if (game.p5_address){
                    setActivePlayer(game.p5_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p1_address) {
                    setActivePlayer(game.p1_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p2_address) {
                    setActivePlayer(game.p2_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p3_address) {
                    setActivePlayer(game.p3_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else {
                    setActivePlayer(game.p4_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                }
            }
        }
    
    
        if (game.p5_address){
            if (active_player === game.p5_address){
                if (game.p1_address){
                    setActivePlayer(game.p1_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p2_address) {
                    setActivePlayer(game.p2_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p3_address) {
                    setActivePlayer(game.p3_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else if (game.p4_address) {
                    setActivePlayer(game.p4_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                } else {
                    setActivePlayer(game.p5_address, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face)
                }
            }
        }
        
    }

    return 'success'
}

async function setActivePlayer(active_player, game_uid, turn, die1_face, die2_face, die3_face, die4_face, die5_face, die6_face, die7_face, die8_face){
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
            die8_state: 0,
            die1_face: die1_face,
            die2_face: die2_face,
            die3_face: die3_face,
            die4_face: die4_face,
            die5_face: die5_face,
            die6_face: die6_face,
            die7_face: die7_face,
            die8_face: die8_face,
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            return error
        }
    return data
}

const randomFace = () => {
    const items = [0,1,2,3,4,5]
    const randomFace = items[Math.floor(Math.random()*items.length)]
    return randomFace
  }