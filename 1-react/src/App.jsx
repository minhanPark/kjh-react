import Button from "./components/Button";

const App = () => (
  <div className="ProductPage">
    <div className="Page">
      <header>
        <h1>메뉴</h1>
      </header>
      <main>
        <ul>
          <li>
            <div className="ProductItem">
              <div className="description">
                <h2>고소한 바질 파스타</h2>
                <div className="">6,000</div>
                <Button
                  styleType="brand"
                  onClick={() => console.log("주문하기 클릭")}
                >
                  주문하기
                </Button>
              </div>
              <div className="thumbnail">
                <img
                  src="./images/menu-고소한바질파스타.jpg"
                  alt="바질 파스타"
                />
              </div>
            </div>
          </li>
        </ul>
      </main>
      <footer>
        <nav className="Navbar">
          <a href="#" className="active">
            메뉴목록
          </a>
          <a href="#" className="">
            주문목록
          </a>
        </nav>
      </footer>
    </div>
  </div>
);

export default App;
