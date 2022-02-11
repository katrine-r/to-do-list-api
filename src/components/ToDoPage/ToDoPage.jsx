import React, { useMemo, useState, useEffect, useCallback } from "react";
import classes from "./ToDoPage.module.scss";
import Input from "../UI/Input/Input";
import ToDoList from "./ToDoList/ToDoList";
import { SVGiconsSelector } from "../UI/SVGiconsSelector/SVGiconsSelector";
import update from "immutability-helper";
import Button from "../UI/Button/Button";
import TodosService from "../../api/TodosService";
import { useDispatch, useSelector } from "react-redux";
import { changeMyToDo, getMyToDo } from "../../store/actions/myToDo";
import { changeCompleted } from '../../store/actions/myToDo'

const ToDoPage = () => {
  // const [myToDo, setMyToDo] = useState(
  //   () => {
  //       const saved = localStorage.getItem("myToDo");
  //       const initialValue = JSON.parse(saved);
  //       return initialValue || [];
  //     }
  //   );

  const dispatch = useDispatch();
  const { myToDo } = useSelector((state) => state.myToDo);
  const { completed } = useSelector((state) => state.completed);
  console.log("myToDoReducer", myToDo);

  // const [myToDo, setMyToDo] = useState([]);
  const [textToDo, setTextToDo] = useState("");
  const [searchToDo, setSearchToDo] = useState("");
  const [filteredMyToDo, setFilteredMyToDo] = useState(myToDo)
  const [isActive, setIsActive] = useState("all")

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const objToDo = { id: Date.now(), textToDo, completed: false, edit: false };
    // setMyToDo([...myToDo, objToDo]);
    setTextToDo("");
    setIsActive("all")
  };

  const removeHandler = (id) => {
    // setMyToDo(myToDo.filter((i) => i.id !== id));
    setIsActive("all")
  };

  const checkToDoHandler = (id) => {
    const checkMyToDo = myToDo.map((i) => {
      console.log('i', i)
      console.log('id', id)
      if (i.id === id) {   
        // return {...i, completed: !i.completed}        
        // return {...i, completed: dispatch(changeCompleted(!completed)) }   
        return {...i, completed: dispatch(changeCompleted(!completed)) }   
        // return dispatch(changeCompleted(!completed))
      } else {
        return i
      }
    })
    console.log('completed', completed)
    dispatch(changeMyToDo(checkMyToDo))
    // setMyToDo(checkMyToDo)
  }

  const filterToDo = useMemo(() => { 
    if (searchToDo) {
      return filteredMyToDo.filter(i => i.text.toLowerCase().includes(searchToDo))
    } else {
      return filteredMyToDo
    }
  }, [searchToDo, filteredMyToDo])

  const filteredActiveCompleted = (checked) => {
    if (checked === "all") {
      setFilteredMyToDo(myToDo)
    } else {
      const filtered = [...myToDo].filter(i => i.completed === checked)
      setFilteredMyToDo(filtered)
    }
    setIsActive(checked)
  }

    const sortedActiveCompleted = (completed) => {
      if (completed) {
      setFilteredMyToDo([...filteredMyToDo.sort((a, b) => {
        return b.completed - a.completed
      })
      ])
    } else {
      setFilteredMyToDo([...filteredMyToDo.sort((a, b) => {
        return a.completed - b.completed
      })
      ])
    }
  }

  const sortedAlphabetical = (sorted) => {
    if (sorted === "ascending") {
      setFilteredMyToDo([...filteredMyToDo.sort((a, b) => {
        return a.text.localeCompare(b.text)
      })
      ])
    } else {
      setFilteredMyToDo([...filteredMyToDo.sort((a, b) => {
        return b.text.localeCompare(a.text)
      })
      ])
    }
  }

  const removeCompletedToDoHandler = () => {
    // setMyToDo(myToDo.filter((i) => i.completed === false))
    setIsActive("all")
  }

  const viewOrEditToDoHandler = (id) => {
    const viewOrEditToDo = myToDo.map((i) => {
      console.log('viewOrEditToDo i ', i)
      if (i.id === id) {
        return {...i, edit: !i.edit}
      } else {
        return i
      }
    })
    // setMyToDo(viewOrEditToDo)
  }

  const editingToDoHandler = (ev, id) => {
    console.log('ev ', ev.target.value)
    console.log('id ', id)
    const editingToDo = myToDo.map((i) => {
      if (i.id === id) {
        return {...i, textToDo: ev.target.value}
      } else {
        return i
      }
    })
    // setMyToDo(editingToDo)
  }

  const finishedEditingKeyEnterHandler = (ev, id) => {
    const finishedEditingKey = myToDo.map((i) => {
      if (i.id === id && ev.key === "Enter") {
        return {...i, edit: false}
      } else {
        return i
      }
    })
    // setMyToDo(finishedEditingKey)
  }

  const moveCardToDo = useCallback((dragIndex, hoverIndex) => {
    const dragCardToDo = myToDo[dragIndex]
    // setMyToDo(update(myToDo, {
    //   $splice: [
    //     [dragIndex, 1],
    //     [hoverIndex, 0, dragCardToDo],
    //   ],
    // }))
  }, [myToDo])

  console.log('myToDo', myToDo);

  useEffect(async () => {
    const myToDo = await TodosService.getTodos();
    dispatch(getMyToDo(myToDo));
    setFilteredMyToDo(myToDo)

    // window.localStorage.setItem("myToDo", JSON.stringify(myToDo));
  }, [])

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

        { myToDo?.length 
          ? <ToDoList 
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
          : <span className={classes.EmptyToDo}>To-do list is empty</span>

        }
      </div>
    </div>
  );
};

export default ToDoPage;
