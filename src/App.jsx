
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import MainNavbar from './components/MainNavbar';
import Header from './components/Header';
import Home from './pages/Home'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Footer from './components/Footer';
import CheckOut from './pages/CheckOut';
import MyAccount from './pages/MyAccount';
import Contact from './pages/Contact';
import About from './pages/About';
import Error404 from './pages/Error404';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsProvider from './components/productsProvider'; 
import { CartWishlistProvider } from './components/CartWishlistContext';
function App() {
 
  return (
    <>
     <Router>
     <Header/>
      <CartWishlistProvider>
      <ProductsProvider>
      <MainNavbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Wishlist.jsx" element={<Wishlist />} />
        <Route path="/SignUp.jsx" element={<SignUp />} />
        <Route path="/Login.jsx" element={<Login />} />
        <Route path="/Cart.jsx" element={<Cart />} />
        <Route path="/CheckOut.jsx" element={<CheckOut />} />
        <Route path="/MyAccount.jsx" element={<MyAccount />} />
        <Route path="/Contact.jsx" element={<Contact />} />
        <Route path="/About.jsx" element={<About />} />
        <Route path="/Error404.jsx" element={<Error404 />} />
        <Route path="/ProductDetailPage.jsx" element={<ProductDetailPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
      </ProductsProvider>
      </CartWishlistProvider>
      <Footer/>
     </Router>
    </>
  )
}

export default App
