import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import PagesLogin from "./pages/pages.login.tsx";
import PagesSignup from "./pages/pages.signup.tsx";
import ComponentsAuthPages from "./components/components.auth.pages.tsx";
import PagesCanvas from "./pages/pages.canvas.tsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import PagesNode from "./pages/pages.node.tsx";
import {CLIENT_PASS} from "./constant/constant.ts";
import CssGlobal from "./css/css.global.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <CssGlobal/>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Routes>
                  <Route path={CLIENT_PASS.LOGIN} element={<PagesLogin/>}/>
                  <Route path={CLIENT_PASS.SIGN_UP} element={<PagesSignup/>}/>
                  <Route path={CLIENT_PASS.CANVAS} element={
                      <ComponentsAuthPages>
                          <PagesCanvas/>
                      </ComponentsAuthPages>}/>
                  <Route path={`${CLIENT_PASS.CANVAS}/:canvasId/nodes`} element={<ComponentsAuthPages>
                      <PagesNode/>
                  </ComponentsAuthPages>}></Route>
              </Routes>
          </BrowserRouter>
      </QueryClientProvider>
  </StrictMode>,
)
