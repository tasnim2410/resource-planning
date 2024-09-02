import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import ClinetPage from './ClientPage.jsx';
import UpdateProjectForm from './UpdateProjectForm.jsx';
import AddTest from './AddTest.jsx';
import UpdateTest from './UpdateTest.jsx';
import AddMachine from './AddMachine.jsx';
import UpdateMachine from './UpdateMachine.jsx';
import AddProduct from './AddProduct.jsx';
import AddProjectForm from './AddProjectForm.jsx'
import AddLeg from './AddLeg.jsx';
import AddTech from './AddTech.jsx';
import DeleteProject from './DeleteProject.jsx'
import DeleteTest from './DeleteTest.jsx';
import { Toaster } from 'sonner';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/projects",
    element: <AddProjectForm/>,
  },
  {
    path: "/client",
    element: <ClinetPage/>,
  },
  {
    path: "/updateProject",
    element: <UpdateProjectForm/>,
  },
  {
    path: "/deleteProject",
    element: <DeleteProject/>,
  },
  {
    path: "/deleteTest",
    element: <DeleteTest/>,
  },
  {
    path: "/addTest",
    element: <AddTest/>,
  },
  {
    path: "/updateTest",
    element: <UpdateTest/>,
  },
  {
    path: "/addMachine",
    element: <AddMachine/>,
  },
  {
    path: "/updateMachine",
    element: <UpdateMachine/>,
  },
  {
    path: "/addProduct",
    element: <AddProduct/>,
  },
  {
    path: "/addLeg",
    element: <AddLeg/>,
  },
  {
    path: "/addTech",
    element: <AddTech/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors></Toaster>
  </React.StrictMode>,
)
