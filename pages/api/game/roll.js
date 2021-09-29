import { supabase } from '../../../utils/supabaseClient'

export default async function handler(req, res){

    const code = req.body.game_uid

    const { data, error } = await supabase.from('games').select().match({game_uid: code})
    const game = data[0]

    if (error){
        res.status(400).json({message: error})
    }

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