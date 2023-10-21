class Node {
    constructor(val){
        this.value = val;
        this.next = null;
    }
}

class List {
    constructor(){
        this.head = null;
        this.length = 0
    }

    add = (val) => {
        if(!this.head){
            return this.head = new Node(val)
        }

        const node = new Node(val);
        let current = this.head;

        this.head = node;
        node.next = current;
        this.length++;
    }

    find = (val) => {
        if(!this.head){
            return -1
        }

        let current = this.head;
        while(current){
            if(current.value === val){
                return current
            }
            current = current.next
        }

        return -1
    }

    removeFirst = () => {
        if(!this.head){
            return null
        }

        let temp = this.head;
        this.head = temp.next;
        this.length--;
        return temp;
    }

    remove = (val) => {
        if(!this.head){
            return null
        }

        let current = this.head;
        let prev = null;

        while(current){
            if(current.value === val){
                prev.next = current.next;
            }
            prev = current;
            current = current.next;
        }
        
        return null;
    }

    getSize = () => {
        return this.length
    }

    displayList = () => {
        let current = this.head;
        while(current){
            console.log(current.value);
            current = current.next;
        }
    }
}