import styles from './Drawer.module.scss'
import Info from '../Info'
import React from 'react'
import AppContext from '../../context'
import axios from 'axios'
import { useCart } from '../../hooks/useCart'

const Drawer = ({ items, removeItem, opened }) => {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [orderId, setOrderId] = React.useState(null)

  const { setCartItems, setCartOpened } = React.useContext(AppContext)
  const { totalPrice } = useCart()
  
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(
        'https://61795c43aa7f3400174049f4.mockapi.io/orders',
        {
          items
        }
      )
      setIsOrderComplete(true)
      setOrderId(data.id)
      setCartItems([])
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        await axios.delete(
          `https://61795c43aa7f3400174049f4.mockapi.io/cart-items/${item.id}`
        )
        await delay(1000)
      }
    } catch (err) {
      alert('Ошибка при оформлении заказа :(')
    }
    setIsLoading(false)
  }
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={`${styles.drawer} d-flex flex-column`}>
        <h2 className='mb-20 d-flex justify-between'>
          Корзина
          <img
            onClick={() => setCartOpened(false)}
            className='cu-p'
            src='/img/btn-remove.svg'
            alt='Remove'
          />
        </h2>
        {items.length ? (
          <>
            <div className={`${styles.items} flex`}>
              {items.map((obj, index) => (
                <div
                  key={index}
                  className={`${styles.cartItem} d-flex align-center mb-20`}
                >
                  <img
                    className='mr-20'
                    width={70}
                    height={70}
                    src={obj.imageUrl}
                    alt='Sneakers'
                  />
                  <div className='mr-20'>
                    <p className='mb-5'>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => removeItem(obj.id)}
                    className={styles.removeBtn}
                    src='/img/btn-remove.svg'
                    alt='Remove'
                  />
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{totalPrice * 0.05} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className='greenButton'
              >
                Оформить заказ
                <img src='/img/Arrow.svg' alt='Arrow' />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            imageUrl={
              isOrderComplete ? '/img/order.png' : '/img/empty-cart.png'
            }
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : ' Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
          />
        )}
      </div>
    </div>
  )
}

export default Drawer
