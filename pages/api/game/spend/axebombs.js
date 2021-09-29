import { supabase } from '../../../../utils/supabaseClient'

export default async function handler(req, res){

    const game_uid = req.body.game_uid
    const die = req.body.die

    const { data, error } = await supabase.from('gamestates').select().match({game_uid: game_uid})
    if (error){
        res.status(400).json({message:'something went wrong'})
    }

    const game = data[0]

    if (die === 1){
        if (game.die1_state === 0){
            if (game.die1_face === 2){
                removeRandomFromMine(game, 3)
            }
            if (game.die1_face === 3){
                removeRandomFromMine(game, 1)
            }
        }
    }

    if (die === 2){
        if (game.die2_state === 0){
            if (game.die2_face === 2){
                removeRandomFromMine(game, 3)
            }
            if (game.die2_face === 3){
                removeRandomFromMine(game, 1)
            }
        }
    }

    if (die === 3){
        if (game.die3_state === 0){
            if (game.die3_face === 2){
                removeRandomFromMine(game, 3)
            }
            if (game.die3_face === 3){
                removeRandomFromMine(game, 1)
            }
        }
    }

    if (die === 4){
        if (game.die4_state === 0){
            if (game.die4_face === 2){
                removeRandomFromMine(game, 3)
            }
            if (game.die4_face === 3){
                removeRandomFromMine(game, 1)
            }
        }
    }

    if (die === 5){
        if (game.die5_state === 0){
            if (game.die5_face === 2){
                removeRandomFromMine(game, 3)
            }
            if (game.die5_face === 3){
                removeRandomFromMine(game, 1)
            }
        }
    }

    if (die === 6){
        if (game.die6_state === 0){
            if (game.die6_face === 2){
                removeRandomFromMine(game, 3)
            }
            if (game.die6_face === 3){
                removeRandomFromMine(game, 1)
            }
        }
    }

    if (die === 7){
        if (game.die7_state === 0){
            if (game.die7_face === 2){
                removeRandomFromMine(game, 3)
            }
            if (game.die7_face === 3){
                removeRandomFromMine(game, 1)
            }
        }
    }

    if (die === 8){
        if (game.die8_state === 0){
            if (game.die8_face === 2){
                removeRandomFromMine(game, 3)
            }
            if (game.die8_face === 3){
                removeRandomFromMine(game, 1)
            }
        }
    }

}

async function removeRandomFromMine(game,quantity){
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

    const all_green = [...Array(green_mine)].map(() => 'green')
    const all_purple = [...Array(purple_mine)].map(() => 'purple')
    const all_red = [...Array(red_mine)].map(() => 'red')
    const all_blue = [...Array(blue_mine)].map(() => 'blue')
    const all_black = [...Array(black_mine)].map(() => 'black')
    const all = all_green.concat(all_purple, all_red, all_blue, all_black)

    var color = all[Math.floor(Math.random()*all.length)];
    if (color === 'green'){
        console.log('pulled green')
        supabase.from('gamestates').update({green_mine:green_mine-quantity, green_table:green_table+quantity}).match({game_uid: game.game_uid})
    }
    if (color === 'purple'){
        console.log('pulled purple')
        supabase.from('gamestates').update({purple_mine:purple_mine-quantity, purple_table:purple_table+quantity}).match({game_uid: game.game_uid})
    }
    if (color === 'red'){
        console.log('pulled red')
        supabase.from('gamestates').update({red_mine:red_mine-quantity, red_table:red_table+quantity}).match({game_uid: game.game_uid})
    }
    if (color === 'blue'){
        console.log('pulled blue')
        supabase.from('gamestates').update({blue_mine:blue_mine-quantity, blue_table:blue_table+quantity}).match({game_uid: game.game_uid})
    }
    if (color === 'black'){
        console.log('pulled black')
        supabase.from('gamestates').update({black_mine:black_mine-quantity, black_table:black_table+quantity}).match({game_uid: game.game_uid})
    }

    res.status(200).json({message:"success"})
}