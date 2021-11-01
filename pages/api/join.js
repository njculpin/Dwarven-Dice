import { supabase } from '../../utils/supabaseClient'

export default async function handler(req, res){

    const game_uid = req.body.game_uid
    const user = req.body.userid

    const { data, error } = await supabase.from('games').select().match({game_uid: game_uid}).single()
    const first = data

    if (error){
        res.status(400).json({message: error})
    }
    
    // if the first seat is taken
    if (first.p1_address){

        // if the first seat is the user
        if (first.p1_address === user) {
            const take = await takeSeat({p1_address: user, players:first.players+1}, first.game_uid, user)
            if (take.status === 'error'){
                res.status(400).json({message: `error taking seat 1`})
            }
            if (take.status === 'success'){
                const initialize = await initializePlayer({p1_address: user , players:first.players+1}, first.game_uid)
                if (initialize.status === 'error'){
                    res.status(400).json({message: `error initializing seat 2`})
                }
                if (initialize.status === 'success'){
                    res.status(200).json({message: initialize.message})
                }
            }
        } else if (first.p2_address) {

            // if the second seat is the user
            if (first.p2_address === user) {
                const take = await takeSeat({p2_address: user, players:first.players+1}, first.game_uid, user)
                if (take.status === 'error'){
                    res.status(400).json({message: `error taking seat 2`})
                }
                if (take.status === 'success'){
                    const initialize = await initializePlayer({p2_address: user, players:first.players+1}, first.game_uid)
                    if (initialize.status === 'error'){
                        res.status(400).json({message: `error initializing seat 2`})
                    }
                    if (initialize.status === 'success'){
                        res.status(200).json({message: initialize.message})
                    }
                }
            } else if (first.p3_address){

                // if the 3rd seat is the user
                if (first.p3_address === user) {
                    const take = await takeSeat({p3_address: user, players:first.players+1}, first.game_uid, user)
                    if (take.status === 'error'){
                        res.status(400).json({message: `error taking seat 3`})
                    }
                    if (take.status === 'success'){
                        const initialize = await initializePlayer({p3_address: user, players:first.players+1}, first.game_uid)
                        if (initialize.status === 'error'){
                            res.status(400).json({message: `error initializing seat 2`})
                        }
                        if (initialize.status === 'success'){
                            res.status(200).json({message: initialize.message})
                        }
                    }
                } else if (first.p4_address) {

                    // if the 4th seat is the user
                    if (first.p4_address === user) {
                        const take = await takeSeat({p4_address: user, players:first.players+1}, first.game_uid, user)
                        if (take.status === 'error'){
                            res.status(400).json({message: `error taking seat 4`})
                        }
                        if (take.status === 'success'){
                            const initialize = await initializePlayer({p4_address: user, players:first.players+1}, first.game_uid)
                            if (initialize.status === 'error'){
                                res.status(400).json({message: `error initializing seat 2`})
                            }
                            if (initialize.status === 'success'){
                                res.status(200).json({message: initialize.message})
                            }
                        }
                    }

                    // if the 4th seat is not the user
                    if (first.p5_address){

                        // if the 5th seat is the user
                        if (first.p5_address === user) {
                            const take = await takeSeat({p5_address: user, players:first.players+1}, first.game_uid, user)
                            if (take.status === 'error'){
                                res.status(400).json({message: `error taking seat 5`})
                            }
                            if (take.status === 'success'){
                                const initialize = await initializePlayer({p5_address: user, players:first.players+1}, first.game_uid)
                                if (initialize.status === 'error'){
                                    res.status(400).json({message: `error initializing seat 2`})
                                }
                                if (initialize.status === 'success'){
                                    res.status(200).json({message: initialize.message})
                                }
                            }
                        } else {
                            // if the 5th seat is not the user and its taken
                            res.status(400).json({message: 'no seats'})
                        }

                    } else {
                        // if the 5th seat is not the user and available
                        const take = await takeSeat({p5_address: user, players:first.players+1}, first.game_uid, user)
                        if (take.status === 'error'){
                            res.status(400).json({message: `error taking seat 5`})
                        }
                        if (take.status === 'success'){
                            const initialize = await initializePlayer({p5_address: user, players:first.players+1}, first.game_uid)
                            if (initialize.status === 'error'){
                                res.status(400).json({message: `error initializing seat 2`})
                            }
                            if (initialize.status === 'success'){
                                res.status(200).json({message: initialize.message})
                            }
                        }
                    }
                } else {
                    // if the 4th seat is not taken and this is not the user
                    const take = await takeSeat({p4_address: user, players:first.players+1}, first.game_uid, user)
                    if (take.status === 'error'){
                        res.status(400).json({message: `error taking seat 4`})
                    }
                    if (take.status === 'success'){
                        const initialize = await initializePlayer({p4_address: user, players:first.players+1}, first.game_uid)
                        if (initialize.status === 'error'){
                            res.status(400).json({message: `error initializing seat 2`})
                        }
                        if (initialize.status === 'success'){
                            res.status(200).json({message: initialize.message})
                        }
                    }
                }
            } else {
                // if the 3rd seat is not taken and this is not the user
                const take = await takeSeat({p3_address: user, players:first.players+1}, first.game_uid, user)
                if (take.status === 'error'){
                    res.status(400).json({message: `error taking seat 3`})
                }
                if (take.status === 'success'){
                    const initialize = await initializePlayer({p3_address: user, players:first.players+1}, first.game_uid)
                    if (initialize.status === 'error'){
                        res.status(400).json({message: `error initializing seat 2`})
                    }
                    if (initialize.status === 'success'){
                        res.status(200).json({message: initialize.message})
                    }
                }
            }
        } else {
            // if the 2nd seat is not taken and this is not the user
            const take = await takeSeat({p2_address: user, players:first.players+1}, first.game_uid, user)
            if (take.status === 'error'){
                res.status(400).json({message: `error taking seat 2`})
            }
            if (take.status === 'success'){
                const initialize = await initializePlayer({p2_address: user, players:first.players+1}, first.game_uid)
                if (initialize.status === 'error'){
                    res.status(400).json({message: `error initializing seat 2`})
                }
                if (initialize.status === 'success'){
                    res.status(200).json({message: initialize.message})
                }
            }
        }
    } else {
        // if the 1st seat is not taken and this is not the user
        const take = await takeSeat({p1_address: user, players:first.players+1}, first.game_uid, user)
        if (take.status === 'error'){
            res.status(400).json({message: `error taking seat 1`})
        }
        if (take.status === 'success'){
            const initialize = await initializePlayer({p1_address: user, players:first.players+1}, first.game_uid)
            if (initialize.status === 'error'){
                res.status(400).json({message: `error initializing seat 2`})
            }
            if (initialize.status === 'success'){
                res.status(200).json({message: initialize.message})
            }
        }
    }

}

async function takeSeat(player, game_uid, user){
    const { data, error } = await supabase
    .from('games')
    .update(player)
    .match({ game_uid: game_uid })
    if (error){
        return {status: 'error', message: error}
    } else {
        assignGameToPlayer(game_uid, user)
        return {status: 'success', message: data}
    }
}

async function assignGameToPlayer(game_uid, user){
    const { data, error } = await supabase
    .from('players')
    .update({game_uid: game_uid, ingame:true})
    .match({ address: user })
    if (error){
        return {status: 'error', message: error}
    } else {
        return {status: 'success', message: data}
    }
}

async function initializePlayer(player, game_uid){
    const { data, error } = await supabase
    .from('gamestates')
    .update(player)
    .match({ game_uid: game_uid })
    if (error){
        return {status: 'error', message: error}
    } else {
        return {status: 'success', message: data}
    }
}