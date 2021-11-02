const Header = () => {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" alt="Logo" />
        <div className="">
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li className="mr-30">
          <img width={18} height={17} src={'/img/Cart.svg'} alt="Cart" />
          <span>1205 руб.</span>
        </li>
        <li>
          <img width={20} height={20} src={'/img/Union.svg'} alt="User" />
        </li>
      </ul>
    </header>
  )
}

export default Header