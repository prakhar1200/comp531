
const Reducer = (state =  {
	nextId: 2,
	todoItems: [
	    {id: 0, text: "This is an item", done: false},
	    {id: 1, text: "Another item", done: false}
	]
}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
				return {...state ,  todoItems: [...state.todoItems, {
        						id: state.nextId++,
        						text: action.text,
        						done: false 
        					}]
    					}
			
		case 'REMOVE_TODO':
				var newState = state.todoItems.filter( (t) => t.id  !== action.id)
				return { ...state, todoItems: newState }
			
		case 'TOGGLE_TODO':
				var newToDoList = state.todoItems.map((t) => t.id === action.id?  { ...t, done : !t.done } :  t)
				return  { ...state, todoItems : newToDoList}
		default: 
				return state
	}
}

export default Reducer