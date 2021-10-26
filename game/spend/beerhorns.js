import { supabase } from '../../utils/supabaseClient'
import spender from './spender'

export default async function handler(die, game_uid, pid){

    const { data, error } = await supabase.from('gamestates').select().match({game_uid: game_uid})

    if (error){
        return error
    }

    const game = data[0]

    var quantity = 0

    if (die === 1){
        if (game.die1_state === 0){
            if (game.die1_face === 4){
                quantity = 2
            }
            if (game.die1_face === 5){
                quantity = 1
            }
            spender(die, game_uid)
        }
    }

    if (die === 2){
        if (game.die2_state === 0){
            if (game.die2_face === 4){
                quantity = 2
            }
            if (game.die2_face === 5){
                quantity = 1
            }
            spender(die, game_uid)
        }
    }

    if (die === 3){
        if (game.die3_state === 0){
            if (game.die3_face === 4){
                quantity = 2
            }
            if (game.die3_face === 5){
                quantity = 1
            }
            spender(die, game_uid)
        }
    }

    if (die === 4){
        if (game.die4_state === 0){
            if (game.die4_face === 4){
                quantity = 2
            }
            if (game.die4_face === 5){
                quantity = 1
            }
            spender(die, game_uid)
        }
    }

    if (die === 5){
        if (game.die5_state === 0){
            if (game.die5_face === 4){
                quantity = 2
            }
            if (game.die5_face === 5){
                quantity = 1
            }
            spender(die, game_uid)
        }
    }

    if (die === 6){
        if (game.die6_state === 0){
            if (game.die6_face === 4){
                quantity = 2
            }
            if (game.die6_face === 5){
                quantity = 1
            }
            spender(die, game_uid)
        }
    }

    if (die === 7){
        if (game.die7_state === 0){
            if (game.die7_face === 4){
                quantity = 2
            }
            if (game.die7_face === 5){
                quantity = 1
            }
            spender(die, game_uid)
        }
    }

    if (die === 8){
        if (game.die8_state === 0){
            if (game.die8_face === 4){
                quantity = 2
            }
            if (game.die8_face === 5){
                quantity = 1
            }
            spender(die, game_uid)
        }
    }

    if (game.active_player === pid){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            active_player_rolls: quantity
        })
        .match({ 
            game_uid: game_uid
        })
        if (error){
            return error
        }

        return data
    }

    if (game.secondary_player === pid){
        const { data, error } = await supabase
        .from('gamestates')
        .update({
            secondary_player_rolls: quantity
        })
        .match({ 
            game_uid: game.game_uid
        })
        if (error){
            return error
        }

        return data
    }

}