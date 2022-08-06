import React, { useMemo, useState, useEffect, useCallback } from "react";
import classes from "./ToDoPage.module.scss";
import Input from "../../components/UI/Input/Input"
import ToDoList from "../../components/ToDoList/ToDoList"
import update from "immutability-helper";
import TodosService from "../../api/TodosService";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, removeToDo, getMyToDoList, changeCompleted, filteredMyToDoList, editToDo, activeList } from "../../store/actions/myToDo";
import Loader from "../../components/UI/Loader/Loader";
import { useFetching } from "../../hooks/useFetching";
import SearchIcon from "../../icons/SearchIcon";
import KeyboardIcon from "../../icons/KeyboardIcon";
import { useNavigate } from "react-router-dom";

const ToDoPage = () => {

  const navigate = useNavigate()

  const redirect = () => {
    const status = Number(window.localStorage.getItem('status'))
    console.log('status number', status)
    if (status === 200) {
      navigate('/')
    } else {
      navigate('/signin')
    }
  }

  const dispatch = useDispatch();
  const { myToDo, filteredToDos, isEdited, isActive } = useSelector((state) => state.myToDo);

  const [textToDo, setTextToDo] = useState("");
  const [searchToDo, setSearchToDo] = useState("");
  const [isSorted, setIsSorted] = useState("");
  const [fetching, isLoading, error] = useFetching(async () => {
    const myToDo = await TodosService.getTodos();
    dispatch(getMyToDoList(myToDo));
    redirect()
  });

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (textToDo != '') {
      const objToDo = { text: textToDo, completed: false };
      await TodosService.postTodos(objToDo);
      dispatch(addToDo([objToDo, ...myToDo]));
      setTextToDo("");
      dispatch(activeList("all"));
      setIsSorted("");

      fetching()
    }
  }

  const removeHandler = async (id) => {
    const removeToDoFilter = myToDo.filter((i) => i.id !== id);
    dispatch(removeToDo(removeToDoFilter));
    dispatch(activeList("all"));

    const toDoById = myToDo.find(i => i.id === id);
    console.log("id", id);
    console.log('removeToDoById', toDoById);

    await TodosService.deleteTodoById(id, toDoById);
    
    redirect()
  }

  const checkToDoHandler = async (id) => {
    if (isActive === "all") {
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
    } else {
      const checkMyToDo = filteredToDos.map((i) => {
        console.log("i", i);
        console.log("id", id);
        if (i.id === id) {
          return { ...i, completed: !i.completed };
        } else {
          return i;
        }
      });
      dispatch(changeCompleted(myToDo, checkMyToDo));
    }

    const toDoById = myToDo.find((i) => i.id === id);
    toDoById.completed = !toDoById.completed;
    console.log("toDoById", toDoById);

    await TodosService.putTodoById(id, toDoById);
    console.log("id", id);

    redirect()
  }

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
      setIsSorted("")
    } else {
      const filtered = [...myToDo.filter((i) => i.completed === checked)];
      dispatch(filteredMyToDoList(filtered));
      setIsSorted("")
    }
    dispatch(activeList(checked));
  }

  const sortedActiveCompleted = (isSorted) => {
    setIsSorted(isSorted)
    if (isSorted === "sortCompleted") {
      dispatch(filteredMyToDoList([
        ...filteredToDos.sort((a, b) => {
          return b.completed - a.completed;
        })
      ]));
    } else {
      dispatch(filteredMyToDoList([
        ...filteredToDos.sort((a, b) => {
          return a.completed - b.completed;
        })
      ]));
    }
  }

  const sortedAlphabetical = (isSorted) => {
    setIsSorted(isSorted)
    if (isSorted === "ascending") {
      dispatch(filteredMyToDoList([
        ...filteredToDos.sort((a, b) => {
          return a.text.localeCompare(b.text);
        })
      ]));
    } else {
      dispatch(filteredMyToDoList([
        ...filteredToDos.sort((a, b) => {
          return b.text.localeCompare(a.text);
        })
      ]));
    }
  }

  const removeCompletedToDoHandler = async () => {
    const removeCompletedToDos = myToDo.filter((i) => i.completed === false)
    dispatch(removeToDo(removeCompletedToDos));
    dispatch(activeList("all"));

    const todosId = myToDo.filter((i) => i.completed === true);
    console.log('todosId', todosId);

    const completedToDos = todosId.map(i => TodosService.deleteTodoById(i.id, i));
    const results = await Promise.all(completedToDos);
    
    redirect()
    console.log('results promise', results);
  }

  const viewOrEditToDoHandler = (id) => {
    const viewOrEditToDo = filteredToDos.map((i) => {
      if (i.id === id) {
        return { ...i, edit: !i.edit };
      } else {
        return i;
      }
    });
    dispatch(editToDo(!isEdited))
    dispatch(filteredMyToDoList(viewOrEditToDo))
    dispatch(getMyToDoList(myToDo, viewOrEditToDo))   

    if (isEdited === false) {
      editedToDoFetch(id);
    } 
  }
  
  const editingToDoHandler = (ev, id) => {
    const editingToDo = filteredToDos.map((i) => {
      if (i.id === id) {
        return { ...i, text: ev.target.value };
      } else {
        return i;
      }
    });
    dispatch(filteredMyToDoList(editingToDo))
    dispatch(getMyToDoList(myToDo, editingToDo))
  }

  const finishedEditingKeyEnterHandler = (ev, id) => { 
    const finishedEditingKey = filteredToDos.map((i) => {
      if (i.id === id && ev.key === "Enter") {
        return { ...i, edit: false };
      } else {
        return i;
      }
    });
    dispatch(filteredMyToDoList(finishedEditingKey));
    dispatch(getMyToDoList(myToDo, finishedEditingKey))

    if (ev.key === "Enter") {
      dispatch(editToDo(!isEdited))
      editedToDoFetch(id);
    }
  }

  const editedToDoFetch = async (id) => {
    const toDoById = filteredToDos.find(i => i.id === id);
    console.log('toDoById', toDoById)
    const putTodo = await TodosService.putTodoById(id, toDoById);
    const getTodos = await TodosService.getTodos();
      
    Promise.all([
      putTodo, 
      getTodos
    ]).then(values => {
      console.log(values)
      dispatch(getMyToDoList(getTodos))
      const filtered = [...getTodos.filter((i) => i.completed === isActive)];
      dispatch(filteredMyToDoList(filtered));

      if (isActive === "all") {
        dispatch(filteredMyToDoList(getTodos));
        setIsSorted("")
      } 
      else {
        const filtered = [...getTodos.filter((i) => i.completed === isActive)];
        dispatch(filteredMyToDoList(filtered));
        setIsSorted("")
      }
      dispatch(activeList(isActive));
    })

    redirect()
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
  )

  console.log("myToDo", myToDo);

  useEffect(() => {
    fetching()
  }, [])

  useEffect(() => {
    dispatch(filteredMyToDoList(myToDo));
  }, [myToDo])

  return (
    <div className={classes.ToDoPage}>
      <div className={classes.ContentWrapper}>
        <div className={classes.SearchWrapper}>
          <span className={classes.IconWrapper}>
            <SearchIcon />
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
            <KeyboardIcon />
          </span>

          <Input
            type="text"
            value={textToDo}
            placeholder="Enter value"
            onChange={(ev) => setTextToDo(ev.target.value)}
          />
        </form>
      </div>

      <div className={classes.ToDos}>
        <div className={classes.ContentWrapper}>
          { 
            isLoading ? 
              <Loader />
              : myToDo?.length ? (
                <ToDoList
                  filteredMyToDo={filterToDo}
                  removeHandler={removeHandler}
                  checkToDoHandler={checkToDoHandler}
                  filteredActiveCompleted={filteredActiveCompleted}
                  sortedActiveCompleted={sortedActiveCompleted}
                  sortedAlphabetical={sortedAlphabetical}
                  removeCompletedToDoHandler={removeCompletedToDoHandler}
                  viewOrEditToDoHandler={viewOrEditToDoHandler}
                  editingToDoHandler={editingToDoHandler}
                  finishedEditingKeyEnterHandler={finishedEditingKeyEnterHandler}
                  moveCardToDo={moveCardToDo}
                  isSorted={isSorted}
                />
              ) : (
                <span className={classes.EmptyToDo}>To-do list is empty</span>
              )
          }
        </div> 
      </div>
    </div>
  );
};

export default ToDoPage;
