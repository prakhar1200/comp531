//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        	done : false            
       }
    }

    render() { 
    	return (
        <li>
		<i className="check glyphicon glyphicon-check" onClick = {this.props.complete} ></i>
		<span contentEditable = "true" className = {this.props.isComplete? "completed" : "" }>
		{this.props.task}
		</span>
		<i className = "destroy glyphicon glyphicon-remove" onClick={this.props.remove}></i>
        </li>
    )}
}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.currentInput = "";
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item", isComplete : false},
                {id:1, text:"Another item", isComplete : false}
            ]
        }
    }
 
    addTodo(inputText) {
        var text = inputText;   
        this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text, isComplete : false}
            ]
        })       
    }

    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text, isComplete}) => id != removeId)
        })
    }

    taksComplete(checkid) {
    	this.setState({
    		todoItems: this.state.todoItems.map((e) => {return e.id == checkid? {id : e.id , text : e.text , isComplete : true} : e	    
    	})
    	})
    }
		
    render() { return (
		<div>
			<input id= "newTODO" type = "text" placeholder = "To dO" onChange = {(e) => this.setState({currentInput : e.target.value})}></input>
			<button onClick = {this.addTodo.bind(this, this.state.currentInput)}>AddItem</button>
			<span className = "Submit">
				<a href ="https://webdev-rice.herokuapp.com" target="_blank">Submit your Exercise </a>
			</span>
			<ul className= "todo">
			{this.state.todoItems.map(function(item) {
				var boundClick = this.removeTodo.bind(this, item.id);
                var checkTask = this.taksComplete.bind(this, item.id);

				return (
				<ToDoItem  remove={boundClick} task={item.text} isComplete = {item.isComplete} complete = {checkTask}/>
				)
			},this)}			
			</ul>
		</div>
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()
