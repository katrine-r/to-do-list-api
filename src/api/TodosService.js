const API_URL = process.env.REACT_APP_API_URL;

export class TodosService {

  static getTodos() {
    return fetch(
        `${API_URL}/API/v1/todo/`,
         {
             'headers': {
                  'accept': 'application/json',
                  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NDQ0Nzk2NDB9.v1X8nvJ5Xkg3Q-u1hkslo8MOfkUD-sSOAhGDjiEEr7A',
             },
         }
    )
  }

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
