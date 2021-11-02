import Card from './components/Card'
import Drawer from './components/Drawer'
import Header from './components/Header'

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="mb-40 d-flex justify-between align-center">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex justify-between">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

export default App
