import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayOut from './components/LayOut/LayOut';
import Home from './components/Home/Home'
import Products from './components/Products/Products';
import Catgories from './components/Catgories/Catgories';
import Cart from './components/Cart/Cart';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Brands from './components/Brands/Brands';
import { useContext, useEffect } from 'react';
import { tokenContext } from './context/tokenContext';
import ProtactedRoutes from './components/ProtactedRoutes/ProtactedRoutes';
import Details from './components/Details/Details';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';





let routers= createBrowserRouter([
  {path:'', element:<LayOut/>,children:[
    {index:true,element:<ProtactedRoutes><Home/></ProtactedRoutes>},
    {path:'products', element:<ProtactedRoutes><Products/></ProtactedRoutes>},
    {path:'catgories', element:<ProtactedRoutes><Catgories/></ProtactedRoutes>},
    {path:'cart', element:<ProtactedRoutes><Cart/></ProtactedRoutes>},
    {path:'brands', element:<ProtactedRoutes><Brands/></ProtactedRoutes>},
    {path:'details/:id', element:<ProtactedRoutes><Details/></ProtactedRoutes>},
    {path:'/checkout', element:<ProtactedRoutes><Checkout/></ProtactedRoutes>},
    {path:'/allorders', element:<ProtactedRoutes><Allorders/></ProtactedRoutes>},

    {path:'register', element:<Register/>},
    {path:'login', element:<Login/>},





    {path:'*', element:<NotFound/>},

  ]}
])




function App() {
  let {setToken} = useContext(tokenContext)

  useEffect(()=>{
    if (localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"))
    }

  },[])




  return (
    <>
  <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
