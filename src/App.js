import Drawer from './components/Drawer/'
import Header from './components/Header/'
import React from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import AppContext from './context'
import Home from './Pages/Home'
import Favorites from './Pages/Favorites'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favoriteItems, setFavoriteItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [isCartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      let favoritesResponse = await axios.get(
        'https://61795c43aa7f3400174049f4.mockapi.io/favorites'
      )
      let cartResponse = await axios.get(
        'https://61795c43aa7f3400174049f4.mockapi.io/cart-items'
      )
      let itemsResponse = await axios.get(
        'https://61795c43aa7f3400174049f4.mockapi.io/card-items'
      )

      setCartItems(cartResponse.data)
      setFavoriteItems(favoritesResponse.data)
      setItems(itemsResponse.data)

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const addToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://61795c43aa7f3400174049f4.mockapi.io/cart-items/${obj.id}`
        )
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        )
      } else {
        let { data } = await axios.post(
          'https://61795c43aa7f3400174049f4.mockapi.io/cart-items',
          obj
        )
        setCartItems((prev) => [...prev, data])
      }
    } catch (err) {
      alert('Не удалось добавить товар в корзину')
    }
  }
  const addToFavorite = async (obj) => {
    try {
      if (favoriteItems.find((item) => item.id === obj.id)) {
        axios.delete(
          `https://61795c43aa7f3400174049f4.mockapi.io/favorites/${obj.id}`
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
    axios.delete(`https://61795c43aa7f3400174049f4.mockapi.io/cart-items/${id}`)
    setCartItems((prev) => prev.filter((obj) => obj.id !== id))
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((item) => Number(item.id) === Number(id))
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
      }}
    >
      <div className="wrapper clear">
        {isCartOpened && (
          <Drawer items={cartItems} removeItem={removeFromCart} />
        )}
        <Header onOpenCart={() => setCartOpened(true)} />
        <div className="content p-40">
          <Routes>
            <Route
              path=""
              element={
                <Home
                  searchValue={searchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  items={items}
                  addToCart={addToCart}
                  addToFavorite={addToFavorite}
                  cartItems={cartItems}
                  favoriteItems={favoriteItems}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="favorites"
              element={
                <Favorites
                  items={favoriteItems}
                  addToCart={addToCart}
                  addToFavorite={addToFavorite}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App
