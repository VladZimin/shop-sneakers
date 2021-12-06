import Card from '../components/Card'
import React from 'react'
import axios from 'axios'
import AppContext from '../context'

const Orders = () => {
  const [orders, setOrders] = React.useState([])
  const { isLoading } = React.useContext(AppContext)
  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://61795c43aa7f3400174049f4.mockapi.io/orders')
      setOrders(data.map((obj) => obj.items).flat())
    })()
  }, [])

  return (
    <div>
      <h1 className='mb-40'>Ваши покупки</h1>
      <div className='d-flex flex-wrap '>
        {(isLoading ? [...Array(8)] : orders).map((obj, index) => <Card key={index} {...obj} loading={isLoading} />)}
      </div>
    </div>
  )
}

export default Orders