import "./App.css";
import Layout from "./hoc/Layout/Layout";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChangeThemeContext } from "./context";
import { Provider } from "react-redux";
import store from "./store/reducers";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import RequireAuth from "./hoc/RequireAuth/RequireAuth";
import { routes } from "./routes"

function App() {

  const [changeTheme, setChangeTheme] = useState("dark")
  const [isAuth, setIsAuth] = useState(window.localStorage.getItem("isAuth"))

  const onChangeThemeHandler = (changeTheme) => {
    if (changeTheme === "dark") {
      setChangeTheme("light")
    } else {
      setChangeTheme("dark")
    }
  }
  console.log('isAuth', isAuth)

  return (
    
    <div className={changeTheme === "dark" ? "App" : "App Light"}>
      <Provider store={store}>
        <ChangeThemeContext.Provider value={{changeTheme}}>
            <DndProvider backend={HTML5Backend}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout
                    setIsAuth={setIsAuth}
                    onChangeThemeHandler={onChangeThemeHandler} 
                  />} >
                  {
                    routes.map(i => 
                      <Route path={i.path} element={
                        i.isPrivate ?
                        <RequireAuth isAuth={isAuth} >
                          {i.element}
                        </RequireAuth>
                        : i.element
                      } />
                    )
                  }
                  <Route path="/signin" element={<SignIn setIsAuth={setIsAuth} />} />
                  <Route path="/signup" element={<SignUp />} />
                  </Route>
                  <Route path="*" element={<Navigate to={isAuth ? "/" : "/signin"} />} /> 
                  </Routes>
              </BrowserRouter>          
            </DndProvider>
        </ChangeThemeContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
