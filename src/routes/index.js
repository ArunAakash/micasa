import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";
import Home from '../pages/Home';
import Layout from '../pages/Layout';
import Featured from '../pages/Featured/Featured';
import ComingSoon from '../components/ComingSoon/ComingSoon';
import ContactUs from '../pages/ContactUs/ContactUs';

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route
            path='/'
            element={<Layout />}
            errorElement={<div>error page</div>}
        >
            <Route index element={<Home />}></Route>
            <Route path='/featured' element={<Featured />}></Route>
            <Route path='/packages' element={<ComingSoon />}></Route>
            <Route path='/contactUs' element={<ContactUs />}></Route>
        </Route>

    )
);

const MyRoutes = () => <RouterProvider router={router} />


export default MyRoutes




