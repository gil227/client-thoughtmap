import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import PagesLogin from "./pages/pages.login.tsx";
import PagesJoin from "./pages/pages.join.tsx";
import ComponentsAuthPages from "./components/components.auth.pages.tsx";
import PagesCanvas from "./pages/pages.canvas.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<PagesLogin/>}/>
              <Route path={"/join"} element={<PagesJoin/>}/>
              <Route path={"/canvas"} element={
                  <ComponentsAuthPages>
                      <PagesCanvas/>
                  </ComponentsAuthPages>}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
