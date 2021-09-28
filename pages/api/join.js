import { supabase } from '../../utils/supabaseClient'
import axios from 'axios'

export default async function handler(req, res){

    const code = req.body.code
    const user = req.body.userid

    const { data, error } = await supabase.from('games').select().match({gameuid: code})
    const first = data[0]

    if (error){
        res.status(400).json({message: error})
    }
    
    // if the first seat is taken
    if (first.p1){

        // if the first seat is the user
        if (first.p1 === user) {
            const take = await takeSeat(1, first.id, user)
            if (take.status === 'error'){
                res.status(400).json({message: `error taking seat 1`})
            }
            if (take.status === 'success'){
                res.status(200).json({message: data})
            }
        } else if (first.p2) {

            // if the second seat is the user
            if (first.p2 === user) {
                const take = await takeSeat(2, first.id, user)
                if (take.status === 'error'){
                    res.status(400).json({message: `error taking seat 2`})
                }
                if (take.status === 'success'){
                    res.status(200).json({message: data})
                }
            } else if (first.p3){

                // if the 3rd seat is the user
                if (first.p3 === user) {
                    const take = await takeSeat(3, first.id, user)
                    if (take.status === 'error'){
                        res.status(400).json({message: `error taking seat 3`})
                    }
                    if (take.status === 'success'){
                        res.status(200).json({message: data})
                    }
                } else if (first.p4) {

                    // if the 4th seat is the user
                    if (first.p4 === user) {
                        const take = await takeSeat(4, first.id, user)
                        if (take.status === 'error'){
                            res.status(400).json({message: `error taking seat 4`})
                        }
                        if (take.status === 'success'){
                            res.status(200).json({message: data})
                        }
                    }

                    // if the 4th seat is not the user
                    if (first.p5){

                        // if the 5th seat is the user
                        if (first.p5 === user) {
                            const take = await takeSeat(5, first.id, user)
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
                        const take = await takeSeat(5, first.id, user)
                        if (take.status === 'error'){
                            res.status(400).json({message: `error taking seat 5`})
                        }
                        if (take.status === 'success'){
                            res.status(200).json({message: data})
                        }
                    }
                } else {
                    // if the 4th seat is not taken and this is not the user
                    const take = await takeSeat(4, first.id, user)
                    if (take.status === 'error'){
                        res.status(400).json({message: `error taking seat 4`})
                    }
                    if (take.status === 'success'){
                        res.status(200).json({message: data})
                    }
                }
            } else {
                // if the 3rd seat is not taken and this is not the user
                const take = await takeSeat(3, first.id, user)
                if (take.status === 'error'){
                    res.status(400).json({message: `error taking seat 3`})
                }
                if (take.status === 'success'){
                    res.status(200).json({message: data})
                }
            }
        } else {
            // if the 2nd seat is not taken and this is not the user
            const take = await takeSeat(2, first.id, user)
            if (take.status === 'error'){
                res.status(400).json({message: `error taking seat 2`})
            }
            if (take.status === 'success'){
                res.status(200).json({message: data})
            }
        }
    } else {
        // if the 1st seat is not taken and this is not the user
        const take = await takeSeat(1, first.id, user)
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
        .from('games')
        .update({p1: user})
        .match({ id: game })
        if (error){
            return {status: 'error', message: error}
        } else {
            return {status: 'success', data: data}
        }
    }
    if (seat === 2){
        const { data, error } = await supabase
        .from('games')
        .update({p12: user})
        .match({ id: game })
        if (error){
            return {status: 'error', message: error}
        } else {
            return {status: 'success', data: data}
        }
    }
    if (seat === 3){
        const { data, error } = await supabase
        .from('games')
        .update({p3: user})
        .match({ id: game })
        if (error){
            return {status: 'error', message: error}
        } else {
            return {status: 'success', data: data}
        }
    }
    if (seat === 4){
        const { data, error } = await supabase
        .from('games')
        .update({p4: user})
        .match({ id: game })
        if (error){
            return {status: 'error', message: error}
        } else {
            return {status: 'success', data: data}
        }
    }
    if (seat === 5){
        const { data, error } = await supabase
        .from('games')
        .update({p5: user})
        .match({ id: game })
        if (error){
            return {status: 'error', message: error}
        } else {
            return {status: 'success', data: data}
        }
    }
}