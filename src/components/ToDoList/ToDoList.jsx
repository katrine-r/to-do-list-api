import React from "react";
import classes from "./ToDoList.module.scss";
import ToDoListItem from "./ToDoListItem/ToDoListItem";
import classNames from "classnames";
import Button from "../UI/Button/Button";
import SortAlphabeticalAscendingIcon from "../../icons/SortAlphabeticalAscendingIcon";
import SortAlphabeticalDescendingIcon from "../../icons/SortAlphabeticalDescendingIcon";
import SortActiveIcon from "../../icons/SortActiveIcon";
import SortCompletedIcon from "../../icons/SortCompletedIcon";
import { useContext } from "react";
import { ChangeThemeContext } from "../../context";
import DeleteCheckedIcon from "../../icons/DeleteCheckedIcon";
import { useSelector } from "react-redux";

const ToDoList = ({
  removeHandler, 
  checkToDoHandler, 
  filteredMyToDo,
  filteredActiveCompleted,
  sortedActiveCompleted,
  sortedAlphabetical,
  removeCompletedToDoHandler,
  viewOrEditToDoHandler,
  editingToDoHandler,
  finishedEditingKeyEnterHandler,
  moveCardToDo,
  isSorted
}) => {
  console.log('filteredMyToDo', filteredMyToDo)
  const { changeTheme } = useContext(ChangeThemeContext)
  const { isActive } = useSelector((state) => state.myToDo)

  return (
    <div className={classes.ToDoList}>
      <ul>
        {filteredMyToDo.map((textItem, index) => {
          return (
            <ToDoListItem
              key={index}
              index={index}
              id={textItem.id}
              text={textItem.text}
              removeHandler={removeHandler}
              checkToDoHandler={checkToDoHandler}
              completed={textItem.completed}
              viewOrEditToDoHandler={viewOrEditToDoHandler}
              edit={textItem.edit}
              editingToDoHandler={editingToDoHandler}
              finishedEditingKeyEnterHandler={finishedEditingKeyEnterHandler}
              moveCardToDo={moveCardToDo}
            />
          );
        })}

        <li className={classes.ListItemButtonWrapper}>
          <div>
            <Button onClick={() => sortedAlphabetical("ascending")}>
              { isSorted === "ascending" && changeTheme === "dark"
                ? <SortAlphabeticalAscendingIcon fill={"#3c5ea7"} />
                : isSorted === "ascending" && changeTheme === "light"
                ? <SortAlphabeticalAscendingIcon fill={"#b763ef"} />
                : <SortAlphabeticalAscendingIcon />
              }
            </Button>
            
            <Button onClick={() => sortedAlphabetical("descending")}>
              { isSorted === "descending" && changeTheme === "dark"
                ? <SortAlphabeticalDescendingIcon fill={"#3c5ea7"} />
                : isSorted === "descending" && changeTheme === "light"
                ? <SortAlphabeticalDescendingIcon fill={"#b763ef"} />
                : <SortAlphabeticalDescendingIcon />
              }
            </Button>

            <Button onClick={() => sortedActiveCompleted("sortActive")}>
              { isSorted === "sortActive" && changeTheme === "dark"
                ? <SortActiveIcon fill={"#3c5ea7"} />
                : isSorted === "sortActive" && changeTheme === "light"
                ? <SortActiveIcon fill={"#b763ef"} />
                : <SortActiveIcon />
              }
            </Button>

            <Button onClick={() => sortedActiveCompleted("sortCompleted")}>
              { isSorted === "sortCompleted" && changeTheme === "dark"
                ? <SortCompletedIcon fill={"#3c5ea7"} />
                : isSorted === "sortCompleted" && changeTheme === "light"
                ? <SortCompletedIcon fill={"#b763ef"} />
                : <SortCompletedIcon />
              }
            </Button>
          </div>

          <div className={classes.ListItemButton}>
            <div>
              <Button
                className={classNames(classes.Button, {
                  [classes.Active]: isActive === "all"
                })}
                onClick={() => filteredActiveCompleted("all")}
              >
                All
              </Button>
              <Button
                className={classNames(classes.Button, {
                  [classes.Active]: isActive === false
                })}
                onClick={() => filteredActiveCompleted(false)}
              >
                Active
              </Button>
              <Button
                className={classNames(classes.Button, {
                  [classes.Active]: isActive === true
                })}
                onClick={() => filteredActiveCompleted(true)}
              >
                Completed
              </Button>
            </div>

            <div>
              <Button onClick={() => removeCompletedToDoHandler()}>
                <DeleteCheckedIcon />
              </Button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ToDoList;
