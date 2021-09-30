import { supabase } from '../../../utils/supabaseClient'
import committer from './committer'

export default async function handler(req, res){
    
    const game_uid = req.body.game_uid
    const die = req.body.die

    if (die === 1){
        committer(die, game_uid)
    }

    if (die === 2){
        committer(die, game_uid)
    }

    if (die === 3){
        committer(die, game_uid)
    }

    if (die === 4){
        committer(die, game_uid)
    }

    if (die === 5){
        committer(die, game_uid)
    }

    if (die === 6){
        committer(die, game_uid)
    }

    if (die === 7){
        committer(die, game_uid)
    }

    if (die === 8){
        committer(die, game_uid)
    }

}

