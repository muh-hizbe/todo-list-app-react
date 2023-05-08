import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import './assets/css/index.css'
import { router } from './routes/routes';
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id')

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
