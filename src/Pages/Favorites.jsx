import React from 'react'
import Card from '../components/Card'

const Favorites = ({ items, addToCart, addToFavorite }) => {
  return (
    <div>
      <h1 className="mb-40">{'Избранные товары'}</h1>
      <div className="d-flex flex-wrap ">
        {items.map((obj, index) => (
          <Card
            key={index}
            {...obj}
            onAddToCart={addToCart}
            onAddToFavorite={addToFavorite}
            favorited={true}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
