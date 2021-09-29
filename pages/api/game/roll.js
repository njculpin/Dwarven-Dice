import { supabase } from '../../../utils/supabaseClient'

export default async function handler(req, res){

    const code = req.body.game_uid

    const { data, error } = await supabase.from('games').select().match({game_uid: code})
    const game = data[0]

    if (error){
        res.status(400).json({message: error})
    }

    const acive_player = game.active_player
    reduce_player_roll(acive_player, game)

    if (game.die1_state === 0){
        const newFace = randomFace()
        updateDie(1, newFace, code)
    }
    if (game.die2_state === 0){
        const newFace = randomFace()
        updateDie(2, newFace, code)
    }
    if (game.die3_state === 0){
        const newFace = randomFace()
        updateDie(3, newFace, code)
    }
    if (game.die4_state === 0){
        const newFace = randomFace()
        updateDie(4, newFace, code)
    }
    if (game.die5_state === 0){
        const newFace = randomFace()
        updateDie(5, newFace, code)
    }
    if (game.die6_state === 0){
        const newFace = randomFace()
        updateDie(6, newFace, code)
    }
    if (game.die7_state === 0){
        const newFace = randomFace()
        updateDie(7, newFace, code)
    }
    if (game.die8_state === 0){
        const newFace = randomFace()
        updateDie(8, newFace, code)
    }

    return res.status(200).json({status:'success', message:game})
}

const reduce_player_roll = async (active_player, game) => {
    console.log(game)
    if (active_player === 1){
        const p1_rolls = game.p1_rolls
        if (p1_rolls >= 1){
            const game_uid = game.game_uid
            const { data, error } = await supabase
            .from('games')
            .update({p1_rolls: p1_rolls-1})
            .match({ game_uid: game_uid })
            if (error){
                console.log(error)
            }  
        }
    }
    if (active_player === 2){
        const p2_rolls = game.p2_rolls
        if (p2_rolls >= 1){
            const game_uid = game.game_uid
            const { data, error } = await supabase
            .from('games')
            .update({p2_rolls: p2_rolls-1})
            .match({ game_uid: game_uid })
            if (error){
                console.log(error)
            }  
        }

    }
    if (active_player === 3){
        const p3_rolls = game.p3_rolls
        if (p3_rolls >= 1){
            const game_uid = game.game_uid
            const { data, error } = await supabase
            .from('games')
            .update({p3_rolls: p3_rolls-1})
            .match({ game_uid: game_uid })
            if (error){
                console.log(error)
            }  
        }

    }
    if (active_player === 4){
        const p4_rolls = game.p4_rolls
        if (p4_rolls >= 1){
            const game_uid = game.game_uid
            const { data, error } = await supabase
            .from('games')
            .update({p4_rolls: p4_rolls-1})
            .match({ game_uid: game_uid })
            if (error){
                console.log(error)
            }  
        }
    }
    if (active_player === 5){
        const p5_rolls = game.p5_rolls
        if (p5_rolls >= 1){
            const game_uid = game.game_uid
            const { data, error } = await supabase
            .from('games')
            .update({p5_rolls: p5_rolls-1})
            .match({ game_uid: game_uid })
            if (error){
                console.log(error)
            } 
        }
    }
}

const randomFace = () => {
    const items = [0,1,2,3,4,5]
    const randomFace = items[Math.floor(Math.random()*items.length)]
    return randomFace
  }

const updateDie = async (die, face, game) => {
    if (die === 1){
        const { data, error } = await supabase
        .from('games')
        .update({die1_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 2){
        const { data, error } = await supabase
        .from('games')
        .update({die2_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 3){
        const { data, error } = await supabase
        .from('games')
        .update({die3_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 4){
        const { data, error } = await supabase
        .from('games')
        .update({die4_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 5){
        const { data, error } = await supabase
        .from('games')
        .update({die5_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 6){
        const { data, error } = await supabase
        .from('games')
        .update({die6_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 7){
        const { data, error } = await supabase
        .from('games')
        .update({die7_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 8){
        const { data, error } = await supabase
        .from('games')
        .update({die8_face: face})
        .match({ game_uid: game })
        if (error){
            console.log(error)
        }
    }
}