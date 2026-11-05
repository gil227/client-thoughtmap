import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@src/css/global.css';
import {BrowserRouter, Route, Routes} from "react-router";
import PagesLogin from "@src/pages/pages.login.tsx";
import PagesSignup from "@src/pages/pages.signup.tsx";
import ComponentsAuthPages from "@src/components/components.auth.pages.tsx";
import PagesCanvas from "@src/pages/pages.canvas.tsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import PagesNode from "@src/pages/pages.node.tsx";
import {CLIENT_PASS} from "@src/constant/constant.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
