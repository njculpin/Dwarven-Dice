import { supabase } from '../../../../utils/supabaseClient'
import collected from './collected'

export default async function handler(req, res){

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

    const die1_face = game.die1_face
    const die2_face = game.die2_face
    const die3_face = game.die3_face
    const die4_face = game.die4_face
    const die5_face = game.die5_face
    const die6_face = game.die6_face
    const die7_face = game.die7_face
    const die8_face = game.die8_face

    const green_table = game.green_table
    const purple_table = game.purple_table
    const red_table = game.red_table
    const blue_table = game.blue_table
    const black_table = game.black_table

    const allFaces = [
        { die: 1, face: die1_face, state:die1_state },
        { die: 2, face: die2_face, state:die2_state },
        { die: 3, face: die3_face, state:die3_state },
        { die: 4, face: die4_face, state:die4_state },
        { die: 5, face: die5_face, state:die5_state },
        { die: 6, face: die6_face, state:die6_state },
        { die: 7, face: die7_face, state:die7_state },
        { die: 8, face: die8_face, state:die8_state }]

    const heads = allFaces.filter(die => die.face === 0).filter(x => x.state === 2)
    const lanterns = allFaces.filter(die => die.face === 1).filter(x => x.state === 2)
    const bombs = allFaces.filter(die => die.face === 2).filter(x => x.state === 2)
    const axes = allFaces.filter(die => die.face === 3).filter(x => x.state === 2)
    const horns = allFaces.filter(die => die.face === 4).filter(x => x.state === 2)
    const beers = allFaces.filter(die => die.face === 5).filter(x => x.state === 2)

    if (heads.length === 3){
        const { data, error } = await supabase.from('gamestates').update({green_table:0, green_p1:game.green_p1+green_table}).match({game_uid: game.game_uid})
        if (error){
            res.status(200).json({message:error})
        }
        heads.forEach(head => collected(head.die))
        res.status(200).json({message:data})
    } else if (lanterns.length === 3){
        const { data, error } = await supabase.from('gamestates').update({purple_table:0, purple_p1:game.purple_p1+purple_table}).match({game_uid: game.game_uid})
        if (error){
            res.status(200).json({message:error})
        }
        lanterns.forEach(lantern => collected(lantern.die))
        res.status(200).json({message:data})
    } else if (bombs.length === 3){
        const { data, error } = await supabase.from('gamestates').update({red_table:0, red_p1:game.red_p1+red_table}).match({game_uid: game.game_uid})
        if (error){
            res.status(200).json({message:error})
        }
        bombs.forEach(bomb => collected(bomb.die))
        res.status(200).json({message:data})
    } else if (axes.length === 3){
        const { data, error } = await supabase.from('gamestates').update({blue_table:0, blue_p1:game.blue_p1+blue_table}).match({game_uid: game.game_uid})
        if (error){
            res.status(200).json({message:error})
        }
        axes.forEach(axe => collected(axe.die))
        res.status(200).json({message:data})
    } else if (horns.length === 1 && beers.length === 2){
        const { data, error } = await supabase.from('gamestates').update({black_table:0, black_p1:game.black_p1+black_table}).match({game_uid: game.game_uid})
        if (error){
            res.status(200).json({message:error})
        }
        horns.forEach(horn => collected(horn.die))
        beers.forEach(beer => collected(beer.die))
        res.status(200).json({message:data})
    } else if (beers.length === 3){
        const { data, error } = await supabase.from('gamestates').update({black_table:black_table-quantity, black_p1:game.black_p1+black_table}).match({game_uid: game.game_uid})
        if (error){
            res.status(200).json({message:error})
        }
        beers.forEach(beer => collected(beer.die))
        res.status(200).json({message:data})
    } else {
        res.status(200).json({message: "not enough collected"})
    }
}