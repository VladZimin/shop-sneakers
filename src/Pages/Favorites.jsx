import React from 'react'
import Card from '../components/Card'
import AppContext from '../context'

const Favorites = ({ addToCart, addToFavorite }) => {

  const { favoriteItems } = React.useContext(AppContext)

  return (
    <div>
      <h1 className='mb-40'>Избранные товары</h1>
      <div className='d-flex flex-wrap '>
        {favoriteItems.map((obj, index) => (
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
