import { useState } from 'react';
import Coin from './Coin';
import {flipCoin} from './helpers'
import heads from './heads.png'
import tails from './tails.png'

const CoinFlipper = () => {
    const [side, setSide] = useState(null)
    const [img, setImg] = useState(null)
    const [total, setTotal] = useState(0)
    const [headsCount, setHeadsCount] = useState(0)
    const [tailsCount, setTailsCount] = useState(0)

    function addHeads() {
        setSide('heads')
        setHeadsCount(headsCount + 1)
        setImg(heads)
    }
    function addTails() {
        setSide('tails')
        setTailsCount(tailsCount + 1)
        setImg(tails)
    }
    function getCoin() {
        let side = flipCoin()
        setTotal(total + 1)
        side === "heads" ? addHeads() : addTails()
    }
    
    return (
        <>
        <h1>Lets Flip a Coin!</h1>
            <Coin img={img} side={side} />
            <button onClick={getCoin}>Flip Me</button>
            <p>Out of {total} flips, there have been {headsCount} heads and {tailsCount} tails.</p>
        </>
    )
}

export default CoinFlipper