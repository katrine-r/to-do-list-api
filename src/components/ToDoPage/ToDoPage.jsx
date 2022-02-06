import React, { useMemo, useState, useEffect, useCallback } from "react";
import classes from "./ToDoPage.module.scss";
import Input from "../UI/Input/Input";
import ToDoList from "./ToDoList/ToDoList";
import { SVGiconsSelector } from "../UI/SVGiconsSelector/SVGiconsSelector";
import update from "immutability-helper";

const ToDoPage = () => {
  const [myToDo, setMyToDo] = useState(
    () => {
        const saved = localStorage.getItem("myToDo");
        const initialValue = JSON.parse(saved);
        return initialValue || [];
      }
    );
  const [textToDo, setTextToDo] = useState("");
  const [searchToDo, setSearchToDo] = useState("");
  const [filteredMyToDo, setFilteredMyToDo] = useState(myToDo)
  const [isActive, setIsActive] = useState("all")

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const objToDo = { id: Date.now(), textToDo, checked: false, edit: false };
    setMyToDo([...myToDo, objToDo]);
    setTextToDo("");
    setIsActive("all")
  };

  const removeHandler = (id) => {
    setMyToDo(myToDo.filter((i) => i.id !== id));
    setIsActive("all")
  };

  const checkToDoHandler = (id) => {
    const checkMyToDo = myToDo.map((i) => {
      console.log('i', i)
      console.log('id', id)
      if (i.id === id) {
        return {...i, checked: !i.checked}     
      } else {
        return i
      }
    })
    setMyToDo(checkMyToDo)
  }

  const filterToDo = useMemo(() => { 
    if (searchToDo) {
      return filteredMyToDo.filter(i => i.textToDo.includes(searchToDo))
    } else {
      return filteredMyToDo
    }
  }, [searchToDo, filteredMyToDo])

  const filteredActiveCompleted = (checked) => {
    if (checked === "all") {
      setFilteredMyToDo(myToDo)
    } else {
      const filtered = [...myToDo].filter(i => i.checked === checked)
      setFilteredMyToDo(filtered)
    }
    setIsActive(checked)
  }

  const sortedActiveCompleted = (checked) => {
    if (checked) {
      setFilteredMyToDo([...filteredMyToDo.sort((a, b) => {
        return b.checked - a.checked
      })
      ])
    } else {
      setFilteredMyToDo([...filteredMyToDo.sort((a, b) => {
        return a.checked - b.checked
      })
      ])
    }
  }

  const sortedAlphabetical = (sorted) => {
    if (sorted === "ascending") {
      setFilteredMyToDo([...filteredMyToDo.sort((a, b) => {
        return a.textToDo.localeCompare(b.textToDo)
      })
      ])
    } else {
      setFilteredMyToDo([...filteredMyToDo.sort((a, b) => {
        return b.textToDo.localeCompare(a.textToDo)
      })
      ])
    }
  }

  const removeCompletedToDoHandler = () => {
    setMyToDo(myToDo.filter((i) => i.checked === false))
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
    setMyToDo(viewOrEditToDo)
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
    setMyToDo(editingToDo)
  }

  const finishedEditingKeyEnterHandler = (ev, id) => {
    const finishedEditingKey = myToDo.map((i) => {
      if (i.id === id && ev.key === "Enter") {
        return {...i, edit: false}
      } else {
        return i
      }
    })
    setMyToDo(finishedEditingKey)
  }

  const moveCardToDo = useCallback((dragIndex, hoverIndex) => {
    const dragCardToDo = myToDo[dragIndex]
    setMyToDo(update(myToDo, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCardToDo],
      ],
    }))
  }, [myToDo])

  useEffect(() => {
    setFilteredMyToDo(myToDo)
    window.localStorage.setItem("myToDo", JSON.stringify(myToDo));
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

        { myToDo.length 
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
          : <span className={classes.EmptyToDo}>
              To-do list is empty
            </span>
        }
      </div>
    </div>
  );
};

export default ToDoPage;
