import "./App.css";
import Layout from "./hoc/Layout/Layout";
import ToDoPage  from "./components/ToDoPage/ToDoPage";
import { useState } from "react";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ChangeThemeContext } from "./context"

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
      <ChangeThemeContext.Provider value={{changeTheme}}>
        <Layout onChangeThemeHandler={onChangeThemeHandler}>
          <DndProvider backend={HTML5Backend}>
            <ToDoPage />
          </DndProvider>
        </Layout>
      </ChangeThemeContext.Provider>
    </div>
  );
}

export default App;
