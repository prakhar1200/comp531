import fetch from 'isomorphic-fetch'
export const url = 'https://webdev-dummy.herokuapp.com'


 const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)
	
  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        if (r.headers.get('Content-Type').indexOf('json') > 0) {
	  
          return r.json()
        } else {

          return r.text()
        }
      } else {

        throw new Error(r.statusText)
      }
    })
}


export default resource

