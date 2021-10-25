import { supabase } from '../utils/supabaseClient'

export default async function handler(game_uid){

    const { data, error } = await supabase.from('gamestates').select().match({game_uid: game_uid})
    const game = data[0]

    if (error){
        return error
    }

    var player_points = []

    // player 1
    const green_p1 = game.green_p1
    const purple_p1 = game.purple_p1
    const red_p1 = game.red_p1
    const blue_p1 = game.blue_p1
    const black_p1 = game.black_p1
    const points_p1 = (green_p1 * 20) + (purple_p1 * 15) + (red_p1 * 10) + (blue_p1 * 5) + (black_p1 * 1)
    player_points.push({points: points_p1, player_uid: game.p1_address})

    // player 2
    const green_p2 = game.green_p2
    const purple_p2 = game.purple_p2
    const red_p2 = game.red_p2
    const blue_p2 = game.blue_p2
    const black_p2 = game.black_p2
    const points_p2 = (green_p2 * 20) + (purple_p2 * 15) + (red_p2 * 10) + (blue_p2 * 5) + (black_p2 * 1)
    player_points.push({points: points_p2, player_uid: game.p2_address})

    // player 3
    const green_p3 = game.green_p3
    const purple_p3 = game.purple_p3
    const red_p3 = game.red_p3
    const blue_p3 = game.blue_p3
    const black_p3 = game.black_p3
    const points_p3 = (green_p3 * 20) + (purple_p3 * 15) + (red_p3 * 10) + (blue_p3 * 5) + (black_p3 * 1)
    player_points.push({points: points_p3, player_uid: game.p3_address})

    // player 4
    const green_p4 = game.green_p4
    const purple_p4 = game.purple_p4
    const red_p4 = game.red_p4
    const blue_p4 = game.blue_p4
    const black_p4 = game.black_p4
    const points_p4 = (green_p4 * 20) + (purple_p4 * 15) + (red_p4 * 10) + (blue_p4 * 5) + (black_p4 * 1)
    player_points.push({points: points_p4, player_uid: game.p4_address})

    // player 5
    const green_p5 = game.green_p5
    const purple_p5 = game.purple_p5
    const red_p5 = game.red_p5
    const blue_p5 = game.blue_p5
    const black_p5 = game.black_p5
    const points_p5 = (green_p5 * 20) + (purple_p5 * 15) + (red_p5 * 10) + (blue_p5 * 5) + (black_p5 * 1)
    player_points.push({points: points_p5, player_uid: game.p5_address})

    const max = Math.max(...player_points.map(person => person.points));
    const maxValues = player_points.filter(person => person.points == max);
    const winner = maxValues.pop()
    
    setWinner(winner, game_uid)
    
    return winner

}

async function setWinner(winner, game_uid){
    const { data, error } = await supabase.from('games').update({winner:winner.player_uid}).match({game_uid: game_uid})
        if (error){
            return error
        }
        return data
}