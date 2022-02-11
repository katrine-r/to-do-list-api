import React from "react";
import classes from "./ToDoList.module.scss";
import ToDoListItem from "./ToDoListItem/ToDoListItem";
import classNames from "classnames";
import { SVGiconsSelector } from "../../UI/SVGiconsSelector/SVGiconsSelector";
import Button from "../../UI/Button/Button";

const ToDoList = ({
  removeHandler, 
  checkToDoHandler, 
  filteredMyToDo,
  filteredActiveCompleted,
  isActive,
  sortedActiveCompleted,
  sortedAlphabetical,
  removeCompletedToDoHandler,
  viewOrEditToDoHandler,
  editingToDoHandler,
  finishedEditingKeyEnterHandler,
  moveCardToDo
}) => {
  console.log('filteredMyToDo', filteredMyToDo)

  return (
    <div className={classes.ToDoList}>
      <ul>
        {filteredMyToDo.map((textItem, index) => {
          return (
            <ToDoListItem
              key={index}
              index={index}
              id={textItem.id}
              // textToDo={textItem.textToDo}
              text={textItem.text}
              removeHandler={removeHandler}
              checkToDoHandler={checkToDoHandler}
              // checked={textItem.checked}
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
              <SVGiconsSelector id="sortAlphabeticalAscending" />
            </Button>
            <Button onClick={() => sortedAlphabetical("descending")}>
              <SVGiconsSelector id="sortAlphabeticalDescending" />
            </Button>

            <Button onClick={() => sortedActiveCompleted(false)}>
              <SVGiconsSelector id="sortActive" />
            </Button>
            <Button onClick={() => sortedActiveCompleted(true)}>
              <SVGiconsSelector id="sortCompleted" />
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
                <SVGiconsSelector id="deleteChecked" />
              </Button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ToDoList;
