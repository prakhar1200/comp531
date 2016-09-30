import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'

import { ToDoItem } from './todoItem'

describe('Validate ToDoItem', () => {

	it('should display a single ToDo', () => {
			const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem id = {1} text = 'Run' done = {false} toggle ={_ => _} remove = {_ => _}/>
				</div>) 
			 const elements = findDOMNode(node).children[0];
			 expect(elements.children.length).to.equal(3);
   		     const span = elements.children[1];
		     expect(span.className).to.equal('');
		     expect(span.innerHTML).to.equal('Run');
	})

	it('should toggle completed when clicked', () => {
			let toggled = false
			const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem id = {1} text = 'Run' done = {false} toggle ={() => {toggled=true }} remove ={ _ => _} />
				</div>)
			const elements = findDOMNode(node).children[0];
			TestUtils.Simulate.click(elements.children[0])
			expect(toggled).to.be.true
	})

	it('should remove an item when clicked', () => {
			let removed = false
			const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem id = {1} text = 'Run' done = {false} toggle ={ _  => _} remove={() => {removed = true}} />
				</div>)
			const elements = findDOMNode(node).children[0];
			TestUtils.Simulate.click(elements.children[2])
			expect(removed).to.be.true
	})

	it('should display a completed ToDo', () => {
			const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem id = {1} text = 'Run' done = {true} toggle ={_ => _} remove={ () => {removed = true}} />
				</div>)
			const elements = findDOMNode(node).children[0];
			const span = elements.children[1];
			expect(span.className).to.equal('completed');
	})

})
