import committer from './committer'

export default async function handler(req, res){
    
    const game_uid = req.body.game_uid
    const die = req.body.die

    console.log(`game_uid -> ${game_uid}`)
    console.log(`die -> ${die}`)

    if (die === 1){
        committer(die, game_uid)
        res.status(200).json({message:'success'})
    }

    if (die === 2){
        committer(die, game_uid)
        res.status(200).json({message:'success'})
    }

    if (die === 3){
        committer(die, game_uid)
        res.status(200).json({message:'success'})
    }

    if (die === 4){
        committer(die, game_uid)
        res.status(200).json({message:'success'})
    }

    if (die === 5){
        committer(die, game_uid)
        res.status(200).json({message:'success'})
    }

    if (die === 6){
        committer(die, game_uid)
        res.status(200).json({message:'success'})
    }

    if (die === 7){
        committer(die, game_uid)
        res.status(200).json({message:'success'})
    }

    if (die === 8){
        committer(die, game_uid)
        res.status(200).json({message:'success'})
    }

}

