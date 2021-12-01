import React from 'react'
import Card from '../components/Card'

const Home = ({
  searchValue,
  items,
  addToCart,
  addToFavorite,
  onChangeSearchInput,
  cartItems,
  favoriteItems,
  isLoading,
}) => {
  const filteredItems = items.filter((el) =>
    el.title.toLowerCase().includes(searchValue.toLowerCase())
  )
  const renderItems = () => {
    return (isLoading ? [...Array(10)] : filteredItems).map((obj, index) => (
      <Card
        key={index}
        {...obj}
        onAddToCart={addToCart}
        onAddToFavorite={addToFavorite}
        loading={isLoading}
        favorited={
          obj &&
          favoriteItems.some((item) => Number(item.id) === Number(obj.id))
        }
      />
    ))
  }

  return (
    <div>
      <div className="mb-40 d-flex justify-between align-center">
        <h1>{searchValue ? `Поиск по: ${searchValue}` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            type="text"
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap ">{renderItems()}</div>
    </div>
  )
}

export default Home
