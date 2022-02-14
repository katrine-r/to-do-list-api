const API_URL = process.env.REACT_APP_API_URL;
const TOKEN = process.env.REACT_APP_TOKEN;

class TodosService {

  static async getTodos() {
    const response = await fetch(
        `${API_URL}/API/v1/todo/`,
         {
             'headers': {
                  'accept': 'application/json',
                  'Authorization': `${TOKEN}`
             },
         }
    )
    const todos = await response.json();
    const myToDo = todos.objects
    return myToDo
  }

  static async postTodos(objToDo) {
    try {
      const response = await fetch(
      `${API_URL}/API/v1/todos/`, 
      {
        method: 'POST',
        body: JSON.stringify(objToDo),
        headers: {
          'accept': 'application/json',
          'Authorization': `${TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

}

export default TodosService