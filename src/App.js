import Drawer from './components/Drawer/'
import Header from './components/Header/'
import Home from './Pages/Home'
import Favorites from './Pages/Favorites'
import Orders from './Pages/Orders'
import AppContext from './context'

import React from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favoriteItems, setFavoriteItems] = React.useState([])

  const [searchValue, setSearchValue] = React.useState('')
  const [isCartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [favoritesResponse, cartResponse, itemsResponse] = await Promise.all([axios.get(
          'https://61795c43aa7f3400174049f4.mockapi.io/favorites'
        ), axios.get(
          'https://61795c43aa7f3400174049f4.mockapi.io/cart-items'
        ), axios.get(
          'https://61795c43aa7f3400174049f4.mockapi.io/card-items'
        )])
        setIsLoading(false)
        setCartItems(cartResponse.data)
        setFavoriteItems(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных ;(')
      }
    }

    fetchData()
  }, [])

  const addToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        )
        axios.delete(
          `https://61795c43aa7f3400174049f4.mockapi.io/cart-items/${findItem.id}`
        )
      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post(
          'https://61795c43aa7f3400174049f4.mockapi.io/cart-items',
          obj
        )
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id
              }
            }
            return item
          })
        )
      }
    } catch (err) {
      alert('Не удалось добавить товар в корзину')
    }
  }
  const addToFavorite = async (obj) => {
    try {
      const findItem = favoriteItems.find((item) => Number(item.id) === Number(obj.id))
      if (findItem) {
        axios.delete(
          `https://61795c43aa7f3400174049f4.mockapi.io/favorites/${findItem.id}`
        )
      } else {
        let { data } = await axios.post(
          'https://61795c43aa7f3400174049f4.mockapi.io/favorites',
          obj
        )
        setFavoriteItems((prev) => [...prev, data])
      }
    } catch (err) {
      alert('Не удалось добавить в избранное')
    }
  }
  const removeFromCart = async (id) => {
    try {
      setCartItems((prev) => prev.filter((obj) => obj.id !== id))
      axios.delete(`https://61795c43aa7f3400174049f4.mockapi.io/cart-items/${id}`)
    } catch (error) {
      alert('Не удвлось удалить товар из корзины!')
    }
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }
  const isItemAdded = (id) => {
    return cartItems.some((item) => Number(item.parentId) === Number(id))
  }
  if (isCartOpened) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'visible'
  }
  return (
    <AppContext.Provider
      value={{
        items,
        favoriteItems,
        cartItems,
        isItemAdded,
        setCartOpened,
        setCartItems,
        isLoading
      }}
    >
      <div className={`wrapper clear`}>
        <Drawer items={cartItems} removeItem={removeFromCart}
                opened={isCartOpened} />
        <Header onOpenCart={() => setCartOpened(true)} />
        <div className='content p-40'>
          <Routes>
            <Route
              path=''
              element={
                <Home
                  searchValue={searchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  addToCart={addToCart}
                  addToFavorite={addToFavorite}
                />
              }
            />
            <Route
              path='favorites'
              element={
                <Favorites
                  addToCart={addToCart}
                  addToFavorite={addToFavorite}
                />
              }
            />
            <Route
              path='orders'
              element={
                <Orders />
              }
            />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App
