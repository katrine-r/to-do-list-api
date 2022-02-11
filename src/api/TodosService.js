const API_URL = process.env.REACT_APP_API_URL;

class TodosService {

  static async getTodos() {
    const response = await fetch(
        `${API_URL}/API/v1/todo/`,
         {
             'headers': {
                  'accept': 'application/json',
                  'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NDQ2NzEyOTd9.jhqdy_b5LMWU7Xl0gc5VIz8yVBkTsQwFuEAke5IEA8k"
             },
         }
    )
    const todos = await response.json();
    const myToDo = todos.objects
    return myToDo
  }

  // static getTodos() {
  //   return fetch(
  //       `${API_URL}/API/v1/todo/`,
  //        {
  //            'headers': {
  //                 'accept': 'application/json',
  //                 'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NDQ2NzEyOTd9.jhqdy_b5LMWU7Xl0gc5VIz8yVBkTsQwFuEAke5IEA8k"
  //            },
  //        }
  //   )
  // }

  static postTodos() {
    return fetch(
      `${API_URL}/API/v1/todos/`, 
      {
        method: 'POST',
        // body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

}

export default TodosService