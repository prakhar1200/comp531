//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;
(function(exports) {

    'use strict'

    function h(tag, props, ...children) {
        return {
            tag,
            props: props ? props : {},
            children: Array.isArray(children[0]) ? children[0] : children
        }
    }

    function createElement(node) {
        console.log('Create element called for', node);

        var newElement = document.createElement(node.tag);

        var childAppender = (parentElem, curNode) => {
            if (curNode.tag) {
                var curElement = document.createElement(curNode.tag);
                for (var prop in curNode.props) {
                    if (curNode.props.hasOwnProperty(prop)) {
                        var myProp = prop == "className" ? "class" : prop;
                        if (myProp == "onClick") {
                            console.log(curNode.props[myProp]);
                            curElement.onclick = curNode.props[myProp];
                        }
                        curElement.setAttribute(myProp, curNode.props[prop]);
                    }
                }
                parentElem.appendChild(curElement);
                if (curNode.children.length) {
                    curNode.children.forEach((childNode) => {
                        childAppender(curElement, childNode);
                    });
                }
            }
            else {
                parentElem.appendChild(document.createTextNode(curNode));
            }
        }
        node.children.forEach(childAppender.bind(null, newElement));

        return newElement;
    }

    function changed(node1, node2) {
        return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props &&
                node1.props.id && node2.props.id &&
                node1.props.id != node2.props.id)
    }

    function updateElement(parent, newNode, oldNode, index = 0) {

        // index will be needed when you traverse children
        // add the new node to the parent DOM element if
        // the new node is different from the old node 
        // at the same location in the DOM.
        // ideally we also handle inserts, but ignore that functionality for now.

        if (!oldNode) {
            parent.appendChild(createElement(newNode))
        }
        else {
            console.log('update element that may have changed')
                // you can use my changed(node1, node2) method above
                // to determine if an element has changed or not

            // be sure to also update the children!
        }
    }

    const deepCopy = (obj) => {
        if (obj === null || typeof(obj) !== 'object')
            return obj;
        const props = {}
        if (obj.props) {
            for (let p in obj.props) {
                props[p] = obj.props[p]
            }
        }
        return h(obj.tag, props,
            Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
    }

    const update = () => requestAnimationFrame(() => {
        // compare the current vdom with the original vdom for updates
        updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
        h.mounted.original = deepCopy(h.mounted.current)
    })

    h.mount = (root, component) => {
        // we keep a copy of the original virtual DOM so we can diff it later for updates
        const originalComponent = deepCopy(component)
        h.mounted = {
            root: root,
            current: component,
            original: originalComponent
        }
        updateElement(root, originalComponent)
    }

    exports.h = h

})(window);