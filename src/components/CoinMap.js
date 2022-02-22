import React from 'react'
import Coin from './Coin.js'

const CoinMap = ({filteredCoins, ativarModalWhatsapp}) => {
            
    return (
        <>
            {filteredCoins.map((fishTape) => {
            return (
              <Coin
                key={fishTape.id}
                name={fishTape.name}
                price={fishTape.current_price}
                symbol={fishTape.symbol}
                marketcap={fishTape.total_volume}
                volume={fishTape.market_cap}
                image={fishTape.image}
                priceChange={fishTape.price_change_percentage_24h}
                ativarModalWhatsapp={ativarModalWhatsapp}
              />
            );
          })}
        </>
    )
}

export default CoinMap;