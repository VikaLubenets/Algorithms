// pros of sorted arrays and linked lists
// in trees the deletion and insertion are fast as well as search of the element

//binary search tree

class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null
    };
}

class Tree {
    constructor(){
        this.root = null;
    };

    find(value) {
        if(!this.root){
            return null
        }

        let current = this.root

        while(current){
            if(current.value === value){
                return current
            } else if (current.value < value){
               current = current.left
            } else {
                current = current.right
            }
        }

        return null
    }

    add(value){

        this.root = addWithin(this.root, value)

        function addWithin(node, value) {
            if(!node){
                return new Node(value);
            }

            if(node.value === value){
                return node
            }
    
            if(node.value < value){
                node.left = addWithin(node.left, value)
            } else {
                node.right = addWithin(node.right, value)
            }
    
            return node
        }
    }

    remove(value){

        this.root = removeNode(this.root, value);

        function removeNode(node, value){

            if(!node){
                return null
            }
    
            if(node.value < value){
                node.left = removeNode(node.left, value);
                return node
            } else if (node.value > value){
                node.right = removeNode(node.right, value);
                return node
            } else {
                if (!node.left && !node.right){
                    return null
                } 

                if (!node.left){
                    node = node.right;
                    return node;
                }

                if (!node.right){
                    node = node.left;
                    return node;
                }

                let minRight = node.right
                while(minRight.left){
                    minRight = minRight.left
                }

                node.value = minRight.value
                node.right = removeNode(node.right, minRight.value)

                return node
            }
        }

    }

    min(){
        if(!this.root){
             return null;
        }

        let current = this.root
        while(current.left){
            current = current.left
        }
        return current.value;
    }

    max(){
        if(!this.root){
             return null;
        }

        let current = this.root
        while(current.right){
            current = current.right
        }
        return current.value;
    }

    leftTraverse(cb){
        this.root = doLeft(this.root, cb)

        function doLeft(node, cb){
            if(node){
                doLeft(node.left, cb);
                cb(node.value);
                doLeft(node.right, cb)
            }
        }
    }

    rightTraverse(cb){
        this.root = doRight(this.root, cb)

        function doRight(node, cb){
            if(node){
                doRight(node.right, cb);
                cb(node.value);
                doRight(node.left, cb)
            }
        }
    }
}