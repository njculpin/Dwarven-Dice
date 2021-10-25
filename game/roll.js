import { supabase } from '../utils/supabaseClient'


export default async function roll(game_uid, pid){

    console.log('rolls hit')

    const { data, error } = await supabase.from('gamestates').select().match({game_uid: game_uid})
    const game = data[0]

    if (error){
        return error
    }

    const active_player = game.active_player
    const active_player_rolls = game.active_player_rolls

    const secondary_player = game.secondary_player
    const secondary_player_rolls = game.secondary_player_rolls

    if (active_player === pid){
        if (active_player_rolls >= 1){
            rollDice(game, game_uid)
            reduce_player_roll(game, pid)
        }    
    }

    if (secondary_player === pid){
        if (secondary_player_rolls >= 1){
            rollDice(game, game_uid)
            reduce_player_roll(game, pid)
            
        }  
    }

    return game
        
}

// export default async function handler(req, res){

//     const game_uid = req.body.game_uid
//     const pid = req.body.pid

//     const { data, error } = await supabase.from('gamestates').select().match({game_uid: game_uid})
//     const game = data[0]

//     if (error){
//         res.status(400).json({message: error})
//     }

//     const active_player = game.active_player
//     const active_player_rolls = game.active_player_rolls

//     const secondary_player = game.secondary_player
//     const secondary_player_rolls = game.secondary_player_rolls

//     if (active_player === pid){
//         if (active_player_rolls >= 1){
//             rollDice(game, game_uid)
//             reduce_player_roll(game, pid)
//         }    
//     }

//     if (secondary_player === pid){
//         if (secondary_player_rolls >= 1){
//             rollDice(game, game_uid)
//             reduce_player_roll(game, pid)
            
//         }  
//     }

//     return res.status(200).json({status:'success', message:game})
        
// }

async function rollDice(game, game_uid){
    if (game.die1_state === 0){
        const newFace = randomFace()
        updateDie(1, newFace, game_uid)
    }
    if (game.die2_state === 0){
        const newFace = randomFace()
        updateDie(2, newFace, game_uid)
    }
    if (game.die3_state === 0){
        const newFace = randomFace()
        updateDie(3, newFace, game_uid)
    }
    if (game.die4_state === 0){
        const newFace = randomFace()
        updateDie(4, newFace, game_uid)
    }
    if (game.die5_state === 0){
        const newFace = randomFace()
        updateDie(5, newFace, game_uid)
    }
    if (game.die6_state === 0){
        const newFace = randomFace()
        updateDie(6, newFace, game_uid)
    }
    if (game.die7_state === 0){
        const newFace = randomFace()
        updateDie(7, newFace, game_uid)
    }
    if (game.die8_state === 0){
        const newFace = randomFace()
        updateDie(8, newFace, game_uid)
    }
}

const randomFace = () => {
    const items = [0,1,2,3,4,5]
    const randomFace = items[Math.floor(Math.random()*items.length)]
    return randomFace
  }

const reduce_player_roll = async (game, pid) => {

    if (pid === game.active_player){
        const active_player_rolls = game.active_player_rolls
        if (active_player_rolls >= 1){
            const { data, error } = await supabase
            .from('gamestates')
            .update({
                active_player_rolls: active_player_rolls-1
            })
            .match({ 
                game_uid: game.game_uid
            })
            if (error){
                console.log(error)
            }
        }
    }

    if (pid === game.secondary_player){
        const secondary_player_rolls = game.secondary_player_rolls
        if (secondary_player_rolls >= 1){
            const { data, error } = await supabase
            .from('gamestates')
            .update({
                secondary_player_rolls: secondary_player_rolls-1
            })
            .match({ 
                game_uid: game.game_uid
            })
            if (error){
                console.log(error)
            }
        }
    }

}

const updateDie = async (die, face, game) => {
    if (die === 1){
        const { data, error } = await supabase
        .from('gamestates')
        .update({die1_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 2){
        const { data, error } = await supabase
        .from('gamestates')
        .update({die2_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 3){
        const { data, error } = await supabase
        .from('gamestates')
        .update({die3_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 4){
        const { data, error } = await supabase
        .from('gamestates')
        .update({die4_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 5){
        const { data, error } = await supabase
        .from('gamestates')
        .update({die5_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 6){
        const { data, error } = await supabase
        .from('gamestates')
        .update({die6_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 7){
        const { data, error } = await supabase
        .from('gamestates')
        .update({die7_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 8){
        const { data, error } = await supabase
        .from('gamestates')
        .update({die8_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
}