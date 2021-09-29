import { supabase } from '../../../utils/supabaseClient'

export default async function handler(req, res){

    const game_uid = req.body.game_uid
    const die = req.body.die
    const pid = req.body.pid

    const { data, error } = await supabase.from('gamestates').select().match({game_uid: game_uid})
    if (error){
        res.status(400).json({message:'something went wrong'})
    }

    const game = data[0]

    if (die === 1){
        if (game.die1_state === 0){
            const die1_face = game.die1_face
            spendDie(die1_face, game, pid)
    
            const { data, error } = await supabase
            .from('gamestates')
            .update({die1_state: 1})
            .match({ game_uid: game_uid })
    
            if (error){
                console.log(error)
            }
        }
    }

    if (die === 2){
        if (game.die2_state === 0){
            const die2_face = game.die2_face
            spendDie(die2_face, game, pid)
    
            const { data, error } = await supabase
            .from('gamestates')
            .update({die2_state: 1})
            .match({ game_uid: game_uid })
    
            if (error){
                console.log(error)
            } 
        }
    }

    if (die === 3){
        if (game.die3_state === 0){
            const die3_face = game.die3_face
            spendDie(die3_face, game, pid)
    
            const { data, error } = await supabase
            .from('gamestates')
            .update({die3_state: 1})
            .match({ game_uid: game_uid })
    
            if (error){
                console.log(error)
            }
        }
    }

    if (die === 4){
        if (game.die4_state === 0){
            const die4_face = game.die4_face
            spendDie(die4_face, game, pid)

            const { data, error } = await supabase
            .from('gamestates')
            .update({die4_state: 1})
            .match({ game_uid: game_uid })
    
            if (error){
                console.log(error)
            }
        }
    }

    if (die === 5){
        if (game.die5_state === 0){
            const die5_face = game.die5_face
            spendDie(die5_face, game, pid)

            const { data, error } = await supabase
            .from('gamestates')
            .update({die5_state: 1})
            .match({ game_uid: game_uid })
    
            if (error){
                console.log(error)
            }
        }
    }

    if (die === 6){
        if (game.die6_state === 0){
            const die6_face = game.die6_face
            spendDie(die6_face, game, pid)

            const { data, error } = await supabase
            .from('gamestates')
            .update({die6_state: 1})
            .match({ game_uid: game_uid })
    
            if (error){
                console.log(error)
            }
        }
    }

    if (die === 7){
        if (game.die7_state === 0){
            const die7_face = game.die7_face
            spendDie(die7_face, game, pid)

            const { data, error } = await supabase
            .from('gamestates')
            .update({die7_state: 1})
            .match({ game_uid: game_uid })
    
            if (error){
                console.log(error)
            } 
        }
    }

    if (die === 8){
        if (game.die8_state === 0){
            const die8_face = game.die8_face
            spendDie(die8_face, game, pid)

            const { data, error } = await supabase
            .from('gamestates')
            .update({die8_state: 1})
            .match({ game_uid: game_uid })
    
            if (error){
                console.log(error)
            }
        }
    }
    
    res.status(200).json({message:'success'})
}

async function spendDie(face, game, pid){

    const active_player = game.active_player
    const secondary_player = game.secondary_player
    const game_uid = game.game_uid

    switch (face) {
        case 0:
            return console.log('head challenge')
        case 1:
            removeChoiceFromMine(game, )
            return console.log('lantern remove 1 of player choice')
        case 2:
            for (let i = 0; i < 3; i++) {
                removeRandomFromMine(game)
              }
            return console.log('bomb remove 3 random from mine to table')
        case 3:
            removeRandomFromMine(game)
            return console.log('axe remove 1 random from mine to table')
        case 4:
            if (active_player === pid){
                addRolls('active_player', 2, game_uid)
            }
            if (secondary_player === pid){
                addRolls('secondary_player', 2, game_uid)
            }
            return console.log('horns')
        case 5:
            if (active_player === pid){
                addRolls('active_player', 1, game_uid)
            }
            if (secondary_player === pid){
                addRolls('secondary_player', 1, game_uid)
            }
            return console.log('beers')
      }
}

async function addRolls(seat, rolls, game_uid){
    if (seat === 'active_player'){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            active_player_rolls: rolls
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            console.log(error)
        }
    }

    if (seat === 'secondary_player'){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            secondary_player_rolls: rolls
        })
        .match({ 
            game_uid: game.game_uid
        })
        if (error){
            console.log(error)
        }
    }
}

async function removeChoiceFromMine(game, color){
    if (color === 'green'){
        console.log('pulled green')
        supabase.from('gamestates').update({green_mine:green_mine-1, green_table:green_table+1}).match({game_uid: game.game_uid})
    }
    if (color === 'purple'){
        console.log('pulled purple')
        supabase.from('gamestates').update({purple_mine:purple_mine-1, purple_table:purple_table+1}).match({game_uid: game.game_uid})
    }
    if (color === 'red'){
        console.log('pulled red')
        supabase.from('gamestates').update({red_mine:red_mine-1, red_table:red_table+1}).match({game_uid: game.game_uid})
    }
    if (color === 'blue'){
        console.log('pulled blue')
        supabase.from('gamestates').update({blue_mine:blue_mine-1, blue_table:blue_table+1}).match({game_uid: game.game_uid})
    }
    if (color === 'black'){
        console.log('pulled black')
        supabase.from('gamestates').update({black_mine:black_mine-1, black_table:black_table+1}).match({game_uid: game.game_uid})
    }
}

async function removeRandomFromMine(game){

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
        supabase.from('gamestates').update({green_mine:green_mine-1, green_table:green_table+1}).match({game_uid: game.game_uid})
    }
    if (color === 'purple'){
        console.log('pulled purple')
        supabase.from('gamestates').update({purple_mine:purple_mine-1, purple_table:purple_table+1}).match({game_uid: game.game_uid})
    }
    if (color === 'red'){
        console.log('pulled red')
        supabase.from('gamestates').update({red_mine:red_mine-1, red_table:red_table+1}).match({game_uid: game.game_uid})
    }
    if (color === 'blue'){
        console.log('pulled blue')
        supabase.from('gamestates').update({blue_mine:blue_mine-1, blue_table:blue_table+1}).match({game_uid: game.game_uid})
    }
    if (color === 'black'){
        console.log('pulled black')
        supabase.from('gamestates').update({black_mine:black_mine-1, black_table:black_table+1}).match({game_uid: game.game_uid})
    }

}