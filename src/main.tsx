import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./pages/Login.tsx";
import Join from "./pages/Join.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Login/>}/>
              <Route path={"/join"} element={<Join/>}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
