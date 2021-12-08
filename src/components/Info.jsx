import AppContext from '../context'
import React from 'react'

const Info = ({ title, description, imageUrl }) => {
  const { setCartOpened } = React.useContext(AppContext)
  const onCloseCart = () => {
    setCartOpened(false)
  }
  return (
    <div
      className='cartEmpty d-flex align-center justify-center flex-column flex'>
      <img className='mb-20' width='120px' src={imageUrl} alt='Empty' />
      <h2>{title}</h2>
      <p className='opacity-6'>{description}</p>
      <button onClick={onCloseCart} className='greenButton'>
        <img src='img/Arrow.svg' alt='Arrow' />
        Вернуться назад
      </button>
    </div>
  )
}
export default Info
