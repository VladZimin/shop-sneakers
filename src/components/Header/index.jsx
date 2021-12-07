import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import React from 'react'
import { useCart } from '../../hooks/useCart'

const Header = ({ onOpenCart }) => {

  const { totalPrice } = useCart()

  return (
    <header className='d-flex justify-between align-center p-40'>
      <Link to='/'>
        <div className='d-flex align-center'>
          <img width={40} height={40} src='img/logo.png' alt='Logo' />
          <div>
            <h3 className='text-uppercase'>React Sneakers</h3>
            <p className='opacity-5'>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className='d-flex cu-p'>
        <li onClick={onOpenCart} className='mr-30'>
          <img width={18} height={17} src={'img/Cart.svg'} alt='Cart' />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to='favorites'>
            <img width={20} height={20} src={'img/heart.svg'} alt='User' />
          </Link>
        </li>
        <li>
          <Link to='orders'>
            <img width={20} height={20} src={'img/Union.svg'} alt='User' />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
