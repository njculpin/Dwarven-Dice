import { supabase } from '../../utils/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res){
    const uuid = uuidv4()

    /**
    * seats
    * 0 - mine
    * 1 - table
    * 2 - p1
    * 3 - p2
    * 4 - p3
    * 5 - p4
    * 6 - p5
    * die states
    * 0 - not used
    * 1 - spent
    * 2 - commit
    */

    const { data, error } = await supabase.from('games').insert({
        "gameuid": uuid,
        "p1":'',
        "p2":'',
        "p3":'',
        "p4":'',
        "p5":'',
        "activeplayer":0,
        "attacker":0,
        "defender":0,
        "die1state":0,
        "die2state":0,
        "die3state":0,
        "die4state":0,
        "die5state":0,
        "die6state":0,
        "die7state":0,
        "die8state":0,
        "die1":0,
        "die2":0,
        "die3":0,
        "die4":0,
        "die5":0,
        "die6":0,
        "die7":0,
        "die8":0,
        "green1":0,
        "green2":0,
        "green3":0,
        "purple1":0,
        "purple2":0,
        "purple3":0,
        "purple4":0,
        "red1":0,
        "red2":0,
        "red3":0,
        "red4":0,
        "red5":0,
        "red6":0,
        "blue1":0,
        "blue2":0,
        "blue3":0,
        "blue4":0,
        "blue5":0,
        "blue6":0,
        "blue7":0,
        "blue8":0,
        "blue9":0,
        "blue10":0,
        "blue11":0,
        "blue12":0,
        "black1":0,
        "black2":0,
        "black3":0,
        "black4":0,
        "black5":0,
        "black6":0,
        "black7":0,
        "black8":0,
        "black9":0,
        "black10":0,
        "black11":0,
        "black12":0,
        "black13":0,
        "black14":0,
        "black15":0,
        "black16":0,
        "black17":0,
        "black18":0,
        "black19":0,
        "black20":0,
        "black21":0,
        "black22":0,
        "black23":0,
        "black24":0,
        "black25":0,
        "black26":0,
        "black27":0,
        "black28":0,
        "black29":0,
        "black30":0,
        "black31":0,
        "black32":0,
        "black33":0,
        "black34":0,
        "black35":0,
        "black36":0,
        "black37":0,
        "black38":0,
        "black39":0,
        "black40":0,
        "black41":0,
        "black42":0,
        "black43":0,
        "black44":0,
        "black45":0,
        "black46":0,
        "black47":0,
        "black48":0,
        "black49":0,
        "black50":0,
        "black51":0,
        "black52":0,
        "black53":0,
        "black54":0,
        "black55":0,
        "black56":0,
        "black57":0,
        "black58":0,
        "black59":0,
        "black60":0
    })
    if (error){ return res.status(400).json({message: error}) }
    res.status(200).json({message: data, uuid: uuid})
}