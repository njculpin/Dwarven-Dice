import { supabase } from '../../../utils/supabaseClient'

export default async function handler(req, res){

    const game_uid = req.body.game_uid
    const die = req.body.die

    const { data, error } = await supabase.from('games').select().match({game_uid: game_uid})
    if (error){
        res.status(400).json({message:'something went wrong'})
    }

    const game = data[0]

    if (die === 1){
        if (game.die1_state === 0){
            const die1_face = game.die1_face
            spendDie(die1_face)
    
            const { data, error } = await supabase
            .from('games')
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
            spendDie(die2_face)
    
            const { data, error } = await supabase
            .from('games')
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
            spendDie(die3_face)
    
            const { data, error } = await supabase
            .from('games')
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
            spendDie(die4_face)

            const { data, error } = await supabase
            .from('games')
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
            spendDie(die5_face)

            const { data, error } = await supabase
            .from('games')
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
            spendDie(die6_face)

            const { data, error } = await supabase
            .from('games')
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
            spendDie(die7_face)

            const { data, error } = await supabase
            .from('games')
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
            spendDie(die8_face)

            const { data, error } = await supabase
            .from('games')
            .update({die8_state: 1})
            .match({ game_uid: game_uid })
    
            if (error){
                console.log(error)
            }   
        }
    }
    
    res.status(200).json({message:'success'})
}

async function spendDie(face){
    switch (face) {
        case 0:
          return console.log('head')
        case 1:
          return console.log('lantern')
        case 2:
          return console.log('bomb')
        case 3:
          return console.log('axe')
        case 4:
          return console.log('horns')
        case 5:
          return console.log('beers')
      }
}