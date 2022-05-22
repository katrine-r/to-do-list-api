import React, { useMemo, useState, useEffect, useCallback } from "react";
import classes from "./ToDoPage.module.scss";
import Input from "../../components/UI/Input/Input"
import ToDoList from "../../components/ToDoList/ToDoList"
import { SVGiconsSelector } from "../../components/UI/SVGiconsSelector/SVGiconsSelector";
import update from "immutability-helper";
import TodosService from "../../api/TodosService";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, removeToDo, getMyToDoList, changeCompleted, filteredMyToDoList } from "../../store/actions/myToDo";
import Loader from "../../components/UI/Loader/Loader";

const ToDoPage = () => {
  // const [myToDo, setMyToDo] = useState(
  //   () => {
  //       const saved = localStorage.getItem("myToDo");
  //       const initialValue = JSON.parse(saved);
  //       return initialValue || [];
  //     }
  //   );

  const dispatch = useDispatch();
  const { myToDo, filteredToDos } = useSelector((state) => state.myToDo);
  console.log("myToDoReducer", myToDo);

  const [textToDo, setTextToDo] = useState("");
  const [searchToDo, setSearchToDo] = useState("");
  const [isActive, setIsActive] = useState("all");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const objToDo = { text: textToDo, completed: false };
    await TodosService.postTodos(objToDo);
    dispatch(addToDo([objToDo, ...myToDo]));
    setTextToDo("");
    setIsActive("all");
    const updateNewToDoList = await TodosService.getTodos()
    dispatch(getMyToDoList(updateNewToDoList))
  };

  const removeHandler = async (id) => {
    const removeToDoFilter = myToDo.filter((i) => i.id !== id);
    dispatch(removeToDo(removeToDoFilter));
    setIsActive("all");

    const toDoById = myToDo.find(i => i.id === id);
    console.log("id", id);
    
    console.log('removeToDoById', toDoById);
    await TodosService.deleteTodoById(id, toDoById);
  };

  const checkToDoHandler = async (id) => {
      const checkMyToDo = myToDo.map((i) => {
      console.log("i", i);
      console.log("id", id);
      if (i.id === id) {
        return { ...i, completed: !i.completed };
      } else {
        return i;
      }
    });
    dispatch(changeCompleted(checkMyToDo));

    const toDoById = myToDo.find((i) => i.id === id);
    toDoById.completed = !toDoById.completed;
    console.log("toDoById", toDoById);

    await TodosService.putTodoById(id, toDoById);
    console.log("id", id);
  };

  const filterToDo = useMemo(() => {
    if (searchToDo) {
      return filteredToDos.filter((i) =>
        i.text.toUpperCase().toLowerCase().includes(searchToDo)
      );
    } else {
      return filteredToDos;
    }
  }, [searchToDo, filteredToDos]);

  const filteredActiveCompleted = (checked) => {
    if (checked === "all") {
      dispatch(filteredMyToDoList(myToDo));
    } else {
      const filtered = [...myToDo.filter((i) => i.completed === checked)];
      dispatch(filteredMyToDoList(filtered));
    }
    setIsActive(checked);
  };

  const sortedActiveCompleted = (completed) => {
    if (completed) {
      dispatch(filteredMyToDoList([
        ...myToDo.sort((a, b) => {
          return b.completed - a.completed;
        })
      ]));
    } else {
      dispatch(filteredMyToDoList([
        ...myToDo.sort((a, b) => {
          return a.completed - b.completed;
        })
      ]));
    }
  };

  const sortedAlphabetical = (sorted) => {
    if (sorted === "ascending") {
      dispatch(filteredMyToDoList([
        ...myToDo.sort((a, b) => {
          return a.text.localeCompare(b.text);
        })
      ]));
    } else {
      dispatch(filteredMyToDoList([
        ...myToDo.sort((a, b) => {
          return b.text.localeCompare(a.text);
        })
      ]));
    }
  };

  const removeCompletedToDoHandler = async () => {
    const removeCompletedToDos = myToDo.filter((i) => i.completed === false)
    dispatch(removeToDo(removeCompletedToDos));
    setIsActive("all");

    const todosId = myToDo.filter((i) => i.completed === true);
    console.log('todosId', todosId);

    const completedToDos = todosId.map(i => TodosService.deleteTodoById(i.id, i));
    
    const results = await Promise.all(completedToDos);
    console.log('results promise', results);
  };

  const viewOrEditToDoHandler = (id) => {
    const viewOrEditToDo = myToDo.map((i) => {
      if (i.id === id) {
        return { ...i, edit: !i.edit };
      } else {
        return i;
      }
    });
    dispatch(getMyToDoList(viewOrEditToDo))
  };
  
  const editingToDoHandler = (ev, id) => {
    console.log("ev ", ev.target.value);
    console.log("id ", id);
    const editingToDo = myToDo.map((i) => {
      if (i.id === id) {
        return { ...i, text: ev.target.value };
      } else {
        return i;
      }
    });
    dispatch(getMyToDoList(editingToDo))
  };

  const finishedEditingKeyEnterHandler = (ev, id) => {
    const finishedEditingKey = myToDo.map((i) => {
      if (i.id === id && ev.key === "Enter") {
        return { ...i, edit: false };
      } else {
        return i;
      }
    });
    dispatch(getMyToDoList(finishedEditingKey));

    if (ev.key === "Enter") {
      editedToDoFetch(id);
    }
  };

  const editedToDoFetch = async (id) => {
    const toDoById = myToDo.find(i => i.id === id);
    await TodosService.putTodoById(id, toDoById);
  }

  const moveCardToDo = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCardToDo = filteredToDos[dragIndex];

      dispatch(filteredMyToDoList(
        update(filteredToDos, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCardToDo],
            ],
          })
      ))
    },
    [filteredToDos]
  );

  console.log("myToDo", myToDo);

  useEffect(async () => {
    const myToDo = await TodosService.getTodos();
    dispatch(getMyToDoList(myToDo));

    // window.localStorage.setItem("myToDo", JSON.stringify(myToDo));
  }, []);

  useEffect(() => {
    dispatch(filteredMyToDoList(myToDo));
  }, [myToDo])

  return (
    <div className={classes.ToDoPage}>
      <div className={classes.ToDoWrapper}>
        <div className={classes.SearchWrapper}>
          <span className={classes.IconWrapper}>
            <SVGiconsSelector id="search" />
          </span>

          <Input
            type="text"
            value={searchToDo}
            placeholder="Search"
            onChange={(ev) => setSearchToDo(ev.target.value)}
          />
        </div>

        <form onSubmit={handleSubmit} className={classes.FormWrapper}>
          <span className={classes.IconWrapper}>
            <SVGiconsSelector id="keyboard" />
          </span>

          <Input
            type="text"
            value={textToDo}
            placeholder="Enter value"
            onChange={(ev) => setTextToDo(ev.target.value)}
          />
        </form>

        {
          myToDo?.length ? (
            <ToDoList
              filteredMyToDo={filterToDo}
              removeHandler={removeHandler}
              checkToDoHandler={checkToDoHandler}
              filteredActiveCompleted={filteredActiveCompleted}
              isActive={isActive}
              sortedActiveCompleted={sortedActiveCompleted}
              sortedAlphabetical={sortedAlphabetical}
              removeCompletedToDoHandler={removeCompletedToDoHandler}
              viewOrEditToDoHandler={viewOrEditToDoHandler}
              editingToDoHandler={editingToDoHandler}
              finishedEditingKeyEnterHandler={finishedEditingKeyEnterHandler}
              moveCardToDo={moveCardToDo}
            />
          ) : (
            <Loader />
          )
        }
      </div>
    </div>
  );
};

export default ToDoPage;
