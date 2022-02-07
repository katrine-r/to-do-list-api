const API_URL = process.env.REACT_APP_API_URL;

export class TodosService {

  static getTodos() {
    return fetch(
        `${API_URL}/API/v1/todo/`,
         {
             'headers': {
                  'accept': 'application/json',
                  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NDQzMzk5ODd9.djBkIzkujN2RnDWvK3Rukf9DUPc6Sr-xWnx7e_r4zRM',
             },
         }
    )
  }
}
