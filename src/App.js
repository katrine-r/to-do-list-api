import "./App.css";
import Layout from "./hoc/Layout/Layout";
import ToDoPage  from "./components/ToDoPage/ToDoPage";
import { useState } from "react";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ChangeThemeContext } from "./context"
import { Provider } from "react-redux";
import store from './store/reducers'

function App() {

  const [changeTheme, setChangeTheme] = useState("dark")

  const onChangeThemeHandler = (changeTheme) => {
    if (changeTheme === "dark") {
      setChangeTheme("light")
    } else {
      setChangeTheme("dark")
    }
  }

  return (
    <div className={changeTheme === "dark" ? "App" : "App Light"}>
      <Provider store={store}>
        <ChangeThemeContext.Provider value={{changeTheme}}>
          <Layout onChangeThemeHandler={onChangeThemeHandler}>
            <DndProvider backend={HTML5Backend}>
              <ToDoPage />
            </DndProvider>
          </Layout>
        </ChangeThemeContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
