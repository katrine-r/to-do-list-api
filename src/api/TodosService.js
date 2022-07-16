const API_URL = process.env.REACT_APP_API_URL;

function saveToken(token) {
  const tokenData = JSON.parse(token)
  window.localStorage.setItem('tokenAccess', tokenData.access_token)
  window.localStorage.setItem('tokenType', tokenData.token_type)
}

class TodosService {

  static async getTodos() {
    const response = await fetch(
        `${API_URL}/API/v1/todo/`,
         {
            'headers': {
              'accept': 'application/json',
              'Authorization': `${window.localStorage.getItem('tokenType')} ${window.localStorage.getItem('tokenAccess')}`                                  
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
          'Authorization': `${window.localStorage.getItem('tokenType')} ${window.localStorage.getItem('tokenAccess')}`,                  
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  static async putTodoById(id, toDoById) {
    try {
      const response = await fetch(`${API_URL}/API/v1/todos/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(toDoById),
        headers: {
          accept: 'application/json',
          'Authorization': `${window.localStorage.getItem('tokenType')} ${window.localStorage.getItem('tokenAccess')}`,
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  static async deleteTodoById(id, toDoById) {
    try {
      await fetch(`${API_URL}/API/v1/todos/${id}/`, {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'Authorization': `${window.localStorage.getItem('tokenType')} ${window.localStorage.getItem('tokenAccess')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Успех:', toDoById);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  static async postCreateUsers(objNewUser) {
    try {
      const response = await fetch(
      `${API_URL}/API/v1/users/`, 
      {
        method: 'POST',
        body: JSON.stringify(objNewUser),
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
    console.log('postUsers', objNewUser)
  }

  static async postLoginUser(objUser) {
    try {
      const response = await fetch(
      `${API_URL}/API/v1/token`, 
      {
        method: 'POST',
        body: JSON.stringify(objUser),
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
        const token = await response.json();
        saveToken(JSON.stringify(token))
        console.log('Успех:', JSON.stringify(token));
    } catch (error) {
      console.error('Ошибка:', error);
    }
    console.log('postLoginUser', objUser)
  }

}

export default TodosService