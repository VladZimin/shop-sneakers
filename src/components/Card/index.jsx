import styles from './Card.module.scss'
import React from 'react'
import ContentLoader from 'react-content-loader'
import AppContext from '../../context'

const Card = ({
                id,
                title,
                price,
                imageUrl,
                onAddToCart,
                onAddToFavorite,
                loading,
                favorited = false
              }) => {
  const { isItemAdded } = React.useContext(AppContext)

  const [isFavorite, setIsFavorite] = React.useState(favorited)
  const onClickPlus = () => {
    onAddToCart({ title, price, imageUrl, id, parentId: id })
  }

  const onClickFavorite = () => {
    onAddToFavorite({ title, price, imageUrl, id, parentId: id })
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={`${styles.card} mr-30`}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={215}
          viewBox='0 0 220 215'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='0' rx='19' ry='19' width='158' height='130' />
          <rect x='0' y='145' rx='6' ry='6' width='158' height='25' />
          <rect x='0' y='183' rx='6' ry='6' width='110' height='32' />
          <rect x='126' y='183' rx='6' ry='6' width='32' height='32' />
        </ContentLoader>
      ) : (
        <>
          {
            onAddToFavorite && <div className={styles.favorite}>
              <img
                onClick={onClickFavorite}
                src={isFavorite ? 'img/liked.png' : 'img/unliked.svg'}
                alt='Избранное'
              />
            </div>
          }
          <img width={158} height={130} src={imageUrl} alt='Sneakers' />
          <h5>{title}</h5>
          <div className='d-flex justify-between align-center'>
            <div className='d-flex flex-column'>
              <span>цена:</span>
              <b>{price} руб.</b>
            </div>
            {
              onAddToCart && <img
                onClick={onClickPlus}
                className='cu-p'
                src={isItemAdded(id) ? 'img/btn-checked.png' : 'img/btn-plus.svg'}
                alt='plus'
              />
            }
          </div>
        </>
      )}
    </div>
  )
}

export default Card
