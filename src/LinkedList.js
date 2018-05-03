class LinkedList {
    constructor() {
        this.head = null;
    }

    push(value) {
        if(this.head === null) {
            this.head = new Node(value, null);
        }
        var curr_node = this.head;
        while(curr_node.next !== null) {
            curr_node = curr_node.next;
        }
        curr_node.next = new Node(value, null);
        return;
    }
    
    atIndex(index) {
        var curr_node = this.head;
        for(var i = 0; i < index; i++) {
            if(curr_node === null) {
                //reached end of list before index, return null
                return null;
            }
            curr_node = curr_node.next;
        }

        return curr_node.value;
    }

    removeAtIndex(index) {
        var prev_node = null;
        var curr_node = this.head;
        if(curr_node === null) { 
            //list is empty
            return null;
        }

        var next_node = this.head.next;

        for(var i = 0; i < index; i++) {
            if(curr_node === null) {
                //reached end of list before index, return null
                return null;
            }
            prev_node = curr_node
            curr_node = curr_node.next;
            next_node = curr_node.next;
        }
        var value = curr_node.value;
        prev_node.next = next_node;

        return value;
    }

}

class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }

    //get value() { return this.value; }
    //get next() { return this.next; }
    //set value(new_value) { this.value = new_value; }
    //set next(new_next) { this.next = new_next; }
}

export default LinkedList;