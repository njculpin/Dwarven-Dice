import committer from './committer'

export default async function handler(game_uid, die){

    if (die === 1){
        committer(die, game_uid)
        return 'success'
    }

    if (die === 2){
        committer(die, game_uid)
        return 'success'
    }

    if (die === 3){
        committer(die, game_uid)
        return 'success'
    }

    if (die === 4){
        committer(die, game_uid)
        return 'success'
    }

    if (die === 5){
        committer(die, game_uid)
        return 'success'
    }

    if (die === 6){
        committer(die, game_uid)
        return 'success'
    }

    if (die === 7){
        committer(die, game_uid)
        return 'success'
    }

    if (die === 8){
        committer(die, game_uid)
        return 'success'
    }

}

