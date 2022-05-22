import React, { useRef } from "react";
import classes from "./ToDoListItem.module.scss";
import { SVGiconsSelector } from "../../UI/SVGiconsSelector/SVGiconsSelector";
import classNames from "classnames";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../../ItemTypes";

const ToDoListItem = ({
  text, 
  id, 
  removeHandler, 
  checkToDoHandler, 
  completed, 
  viewOrEditToDoHandler,
  edit,
  editingToDoHandler,
  finishedEditingKeyEnterHandler,
  moveCardToDo,
  index
}) => {

  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.TEXTITEM, 
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top)
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCardToDo(dragIndex, hoverIndex)
      item.index = hoverIndex
      
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TEXTITEM,
    item: () => {
      return {id, index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <li className={classes.ToDoListItem}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div className={classes.ItemWrapper}>
        <span
          className={classNames(classes.ItemIcon, { [classes.Check]: completed })}
          onClick={() => checkToDoHandler(id)}
        >
          { completed
              ? <SVGiconsSelector id="checkBold" className={classes.CheckBoldIcon} /> 
              : <SVGiconsSelector id="checkboxBlankCircle" />
          }
        </span>
      </div>
      
      <div className={classes.ToDoWrapper}>
        { edit
          ? <Input  
              value={text} 
              onChange={(ev) => editingToDoHandler(ev, id)} 
              onKeyPress={(ev) => finishedEditingKeyEnterHandler(ev, id)} 
            />
          : <span
              className={classNames(classes.ItemText, {
                [classes.CheckText]: completed
              })}
            >
              {text}
            </span>
        }
      </div>

      <div className={classes.ButtonWrapper}>
        <Button onClick={() => viewOrEditToDoHandler(id)}>
          <SVGiconsSelector id="edit" />
        </Button>
        <Button onClick={() => removeHandler(id)}>
          <SVGiconsSelector id="delete" />
        </Button>
      </div>
    </li>
  );
};

export default ToDoListItem;
