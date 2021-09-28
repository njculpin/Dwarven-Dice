import { supabase } from '../../../utils/supabaseClient'

export default async function handler(req, res){

    const code = req.body.gameuid

    const { data, error } = await supabase.from('games').select().match({gameuid: code})
    const game = data[0]

    if (error){
        res.status(400).json({message: error})
    }

    // die state 0 -> unspent
    // die state 1 -> spent
    // die state 2 -> commit

    if (game.die1state === 0){
        const newFace = randomFace()
        updateDie(1, newFace, code)
    }
    if (game.die2state === 0){
        const newFace = randomFace()
        updateDie(2, newFace, code)
    }
    if (game.die3state === 0){
        const newFace = randomFace()
        updateDie(3, newFace, code)
    }
    if (game.die4state === 0){
        const newFace = randomFace()
        updateDie(4, newFace, code)
    }
    if (game.die5state === 0){
        const newFace = randomFace()
        updateDie(5, newFace, code)
    }
    if (game.die6state === 0){
        const newFace = randomFace()
        updateDie(6, newFace, code)
    }
    if (game.die7state === 0){
        const newFace = randomFace()
        updateDie(7, newFace, code)
    }
    if (game.die8state === 0){
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
        .update({die1: face})
        .match({ gameuid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 2){
        const { data, error } = await supabase
        .from('games')
        .update({die2: face})
        .match({ gameuid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 3){
        const { data, error } = await supabase
        .from('games')
        .update({die3: face})
        .match({ gameuid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 4){
        const { data, error } = await supabase
        .from('games')
        .update({die4: face})
        .match({ gameuid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 5){
        const { data, error } = await supabase
        .from('games')
        .update({die5: face})
        .match({ gameuid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 6){
        const { data, error } = await supabase
        .from('games')
        .update({die6: face})
        .match({ gameuid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 7){
        const { data, error } = await supabase
        .from('games')
        .update({die7: face})
        .match({ gameuid: game })
        if (error){
            console.log(error)
        }
    }
    if (die === 8){
        const { data, error } = await supabase
        .from('games')
        .update({die8: face})
        .match({ gameuid: game })
        if (error){
            console.log(error)
        }
    }
}