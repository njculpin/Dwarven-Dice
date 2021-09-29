import { supabase } from '../../utils/supabaseClient'
import axios from 'axios'

export default async function handler(req, res){

    const code = req.body.code
    const user = req.body.userid

    const { data, error } = await supabase.from('gamestates').select().match({game_uid: code})
    const first = data[0]

    if (error){
        res.status(400).json({message: error})
    }
    
    // if the first seat is taken
    if (first.p1_address){

        // if the first seat is the user
        if (first.p1_address === user) {
            const take = await takeSeat(1, first.game_uid, user)
            if (take.status === 'error'){
                res.status(400).json({message: `error taking seat 1`})
            }
            if (take.status === 'success'){
                res.status(200).json({message: data})
            }
        } else if (first.p2_address) {

            // if the second seat is the user
            if (first.p2_address === user) {
                const take = await takeSeat(2, first.game_uid, user)
                if (take.status === 'error'){
                    res.status(400).json({message: `error taking seat 2`})
                }
                if (take.status === 'success'){
                    res.status(200).json({message: data})
                }
            } else if (first.p3_address){

                // if the 3rd seat is the user
                if (first.p3_address === user) {
                    const take = await takeSeat(3, first.game_uid, user)
                    if (take.status === 'error'){
                        res.status(400).json({message: `error taking seat 3`})
                    }
                    if (take.status === 'success'){
                        res.status(200).json({message: data})
                    }
                } else if (first.p4_address) {

                    // if the 4th seat is the user
                    if (first.p4_address === user) {
                        const take = await takeSeat(4, first.game_uid, user)
                        if (take.status === 'error'){
                            res.status(400).json({message: `error taking seat 4`})
                        }
                        if (take.status === 'success'){
                            res.status(200).json({message: data})
                        }
                    }

                    // if the 4th seat is not the user
                    if (first.p5_address){

                        // if the 5th seat is the user
                        if (first.p5_address === user) {
                            const take = await takeSeat(5, first.game_uid, user)
                            if (take.status === 'error'){
                                res.status(400).json({message: `error taking seat 5`})
                            }
                            if (take.status === 'success'){
                                res.status(200).json({message: data})
                            }
                        } else {
                            // if the 5th seat is not the user and its taken
                            res.status(400).json({message: 'no seats'})
                        }

                    } else {
                        // if the 5th seat is not the user and available
                        const take = await takeSeat(5, first.game_uid, user)
                        if (take.status === 'error'){
                            res.status(400).json({message: `error taking seat 5`})
                        }
                        if (take.status === 'success'){
                            res.status(200).json({message: data})
                        }
                    }
                } else {
                    // if the 4th seat is not taken and this is not the user
                    const take = await takeSeat(4, first.game_uid, user)
                    if (take.status === 'error'){
                        res.status(400).json({message: `error taking seat 4`})
                    }
                    if (take.status === 'success'){
                        res.status(200).json({message: data})
                    }
                }
            } else {
                // if the 3rd seat is not taken and this is not the user
                const take = await takeSeat(3, first.game_uid, user)
                if (take.status === 'error'){
                    res.status(400).json({message: `error taking seat 3`})
                }
                if (take.status === 'success'){
                    res.status(200).json({message: data})
                }
            }
        } else {
            // if the 2nd seat is not taken and this is not the user
            const take = await takeSeat(2, first.game_uid, user)
            if (take.status === 'error'){
                res.status(400).json({message: `error taking seat 2`})
            }
            if (take.status === 'success'){
                res.status(200).json({message: data})
            }
        }
    } else {
        // if the 1st seat is not taken and this is not the user
        const take = await takeSeat(1, first.game_uid, user)
        if (take.status === 'error'){
            res.status(400).json({message: `error taking seat 1`})
        }
        if (take.status === 'success'){
            res.status(200).json({message: data})
        }
    }

}

async function takeSeat(seat, game, user){
    if (seat === 1){
        const { data, error } = await supabase
        .from('gamestates')
        .update({p1_address: user})
        .match({ game_uid: game })
        if (error){
            return {status: 'error', message: error}
        } else {
            assignGameToPlayer(game, user)
            return {status: 'success', data: data}
        }
    }
    if (seat === 2){
        const { data, error } = await supabase
        .from('gamestates')
        .update({p2_address: user})
        .match({ game_uid: game })
        if (error){
            return {status: 'error', message: error}
        } else {
            assignGameToPlayer(game, user)
            return {status: 'success', data: data}
        }
    }
    if (seat === 3){
        const { data, error } = await supabase
        .from('gamestates')
        .update({p3_address: user})
        .match({ game_uid: game })
        if (error){
            return {status: 'error', message: error}
        } else {
            assignGameToPlayer(game, user)
            return {status: 'success', data: data}
        }
    }
    if (seat === 4){
        const { data, error } = await supabase
        .from('gamestates')
        .update({p4_address: user})
        .match({ game_uid: game })
        if (error){
            return {status: 'error', message: error}
        } else {
            assignGameToPlayer(game, user)
            return {status: 'success', data: data}
        }
    }
    if (seat === 5){
        const { data, error } = await supabase
        .from('gamestates')
        .update({p5_address: user})
        .match({ game_uid: game })
        if (error){
            return {status: 'error', message: error}
        } else {
            assignGameToPlayer(game, user)
            return {status: 'success', data: data}
        }
    }
}

async function assignGameToPlayer(game, user){
    const { data, error } = await supabase
    .from('players')
    .update({game_uid: game, ingame:true})
    .match({ address: user })
    if (error){
        return {status: 'error', message: error}
    } else {
        return {status: 'success', data: data}
    }
}