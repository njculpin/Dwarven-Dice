import { supabase } from '../../../../utils/supabaseClient'

export default async function handler(req, res){

    const secondary_player = req.body.secondary_player
    const game_uid = req.body.game_uid

    const { data, error } = await supabase.from('gamestates').select().match({game_uid: game_uid})
    if (error){
        res.status(400).json({message:'something went wrong'})
    }

    const game = data[0]
    
    const die1_state = game.die1_state
    const die2_state = game.die2_state
    const die3_state = game.die3_state
    const die4_state = game.die4_state
    const die5_state = game.die5_state
    const die6_state = game.die6_state
    const die7_state = game.die7_state
    const die8_state = game.die8_state

    var dice = []

    if (die1_state === 0){
        dice.push(1)
    }

    if (die2_state === 0){
        dice.push(2)
    }

    if (die3_state === 0){
        dice.push(3)
    }

    if (die4_state === 0){
        dice.push(4)
    }

    if (die5_state === 0){
        dice.push(5)
    }

    if (die6_state === 0){
        dice.push(6)
    }

    if (die7_state === 0){
        dice.push(7)
    }

    if (die8_state === 0){
        dice.push(8)
    }

    if (dice.length >= 2){

        var half = 0

        if (isOdd(dice.length)>=1){
            var countplusone = dice.length+1
            half = countplusone/2
        } else {
            var half = dice.length/2
        }

        for (let i = 0; i < half; i++) {
            var assign_secondary = dice[Math.floor(Math.random()*dice.length)];
            assignDieToPlayer(assign_secondary, secondary_player, game_uid)
            const index = dice.indexOf(assign_secondary)
            if (index > -1) {
                dice.splice(index, 1)
            }
         }
    }
}

function isOdd(num) { return num % 2;}

async function assignDieToPlayer(assign_secondary, secondary_player, game_uid){
    // assign to secondary player
    if (assign_secondary === 1){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die1_location: secondary_player,
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            res.status(400).json({message:error})
        }
    }

    if (assign_secondary === 2){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die2_location: secondary_player,
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            res.status(400).json({message:error})
        }
    }

    if (assign_secondary === 3){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die3_location: secondary_player,
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            res.status(400).json({message:error})
        }
    }

    if (assign_secondary === 4){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die4_location: secondary_player,
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            res.status(400).json({message:error})
        }
    }

    if (assign_secondary === 5){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die5_location: secondary_player,
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            res.status(400).json({message:error})
        }
    }

    if (assign_secondary === 6){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die6_location: secondary_player,
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            res.status(400).json({message:error})
        }
    }

    if (assign_secondary === 7){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die7_location: secondary_player,
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            res.status(400).json({message:error})
        }
    }

    if (assign_secondary === 8){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            die8_location: secondary_player,
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            res.status(400).json({message:error})
        }
    }
}