import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router";

import Homelayout from "../Layout/Homelayout";
import Signup from "../page/Signup";
import App from "../App";
import Signin from "../page/Signin";

import Hoamepage from "../page/Hoamepage";
import Privaterout from "../component/Privaterout/Privaterout";

import Error from "../Error/Error";
import ForgetPassword from "../component/ForgetPassword/ForgetPassword";
import AddCars from "../page/AddCars";
import MyCars from "../page/MyCars";
import UpdateCar from "../page/UpdateCar";
import AvailableCars from "../page/AvailableCars";
import CarDetails from "../page/CarDetails";
import MyBooking from "../page/MyBooking";
import Home from "../component/Home/Home";


export const router=createBrowserRouter([
  {
    path: "/",
    //loader:()=>fetch('https://car-rental-azure-zeta.vercel.app//cars'),
    element: <Homelayout></Homelayout>, 
    children:[
      { index: true, 
        element:<Home></Home>,
        loader:()=>fetch('https://car-rental-azure-zeta.vercel.app/allCars')
       },
      

{
  path:"/signup",
  element: <Signup></Signup>
},
{
  path:"/signin",
  element:<Signin></Signin>
},
{
  path:"/a",
  element: <div>hello</div>
},
{
  path:"/addCars",
  element: <Privaterout><AddCars></AddCars></Privaterout>
},

{
  path:"/available",
  loader:()=>fetch(`https://car-rental-azure-zeta.vercel.app/cars`),
  element: <AvailableCars></AvailableCars>
},

{
  path:"/cars/:email",
  element: <Privaterout><MyCars></MyCars></Privaterout>
},

{
  path:"/update/:id",
     loader:({params})=>fetch(`https://car-rental-azure-zeta.vercel.app/update/${params.id}`,{credentials: 'include'}),
  element: <Privaterout>
    <UpdateCar></UpdateCar>
  </Privaterout>,
},
{
  path: '/car/:id',
  element: <CarDetails></CarDetails>,
  loader: async ({ params }) => fetch(`https://car-rental-azure-zeta.vercel.app/car/${params.id}`,{credentials: 'include'}).then(res => res.json()),
},
{
  path:"/bookings",
  element:<Privaterout><MyBooking></MyBooking></Privaterout>
}








 ]
}, 
{ path: '/*', element: <Error></Error> },
{ path: '/forgetPassword', element: <ForgetPassword></ForgetPassword> },


 
     




]);