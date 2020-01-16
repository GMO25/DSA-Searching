
class _Node {
 constructor(data, next,value) {
     this.data = data;
     this.next = next;
    
 }
}

class Queue { 
    
    constructor() {
     this.first = null;
     this.last = null;
     this.length = 0;
    }
  
    enqueue(data){
     const node = new _Node(data);
     this.length ++ 
     if(this.first === null || this.first === undefined){
      this.first = node;

     }
    
     if (this.last){
        
      this.last.next = node;
     }
     
     this.last = node;
    }
   
    dequeue(){
       
     if (this.first === null || this.first === undefined) {
      return null;
     }
     this.length --
     console.log('ki')
     const node = this.first;
     console.log(this.first)
     //console.log(node.value)
     
     this.first = this.first.next;
     if (node === this.last) {
        this.last = null;
     }
     return node.data;
    }
    isEmpty(){
        if(this.first === null){
         return true
        } else return false
       }
       len(){
        if(this.length === 0){
            return 0
        } else {
            return this.length
        }
    }
   }

class BinarySearchTree {
 constructor(key = null, value = null, parent = null) {
     this.key = key;
     this.value = value;
     this.parent = parent;
     this.left = null;
     this.right = null;
 }
 insert(key, value) {
  // If the tree is empty then this key being inserted is the root node of the tree
  if (this.key == null) {
      this.key = key;
      this.value = value;
  }

  /* If the tree already exists, then start at the root, 
     and compare it to the key you want to insert.
     If the new key is less than the node's key 
     then the new node needs to live in the left-hand branch */
  else if (key < this.key) {
   //console.log(key, this.key)
      /* If the existing node does not have a left child, 
         meaning that if the `left` pointer is empty, 
         then we can just instantiate and insert the new node 
         as the left child of that node, passing `this` as the parent */
      if (this.left == null) {
          this.left = new BinarySearchTree(key, value, this);
      }
      /* If the node has an existing left child, 
         then we recursively call the `insert` method 
         so the node is added further down the tree */
      else {
          this.left.insert(key, value);
      }
  }
  // Similarly, if the new key is greater than the node's key 
    // then you do the same thing, but on the right-hand side */
  else {
      if (this.right == null) {
          this.right = new BinarySearchTree(key, value, this);
      }
      else {
          this.right.insert(key, value);
      }
  }
}
find(key) {
 // If the item is found at the root then return that value
 if (this.key == key) {
     return this.value;
 }
 /* If the item you are looking for is less than the root 
    then follow the left child.
    If there is an existing left child, 
    then recursively check its left and/or right child
    until you find the item */
 else if (key < this.key && this.left) {
     return this.left.find(key);
 }
 /* If the item you are looking for is greater than the root 
    then follow the right child.
    If there is an existing right child, 
    then recursively check its left and/or right child
    until you find the item */
 else if (key > this.key && this.right) {
     return this.right.find(key);
 }
 // You have searched the tree and the item is not in the tree
 else {
     throw new Error('Key Error');
 }
}
remove(key) {
 if (this.key == key) {
     if (this.left && this.right) {
         const successor = this.right._findMin();
         this.key = successor.key;
         this.value = successor.value;
         successor.remove(successor.key);
     }
     /* If the node only has a left child, 
        then you replace the node with its left child */
     else if (this.left) {
      console.log('recursive left call')
         this._replaceWith(this.left);
     }
     /* And similarly if the node only has a right child 
        then you replace it with its right child */
     else if (this.right) {
      console.log('recursive right call')
         this._replaceWith(this.right);
     }
     /* If the node has no children then
        simply remove it and any references to it 
        by calling "this._replaceWith(null)" */
     else {
         this._replaceWith(null);
     }
 }
 else if (key < this.key && this.left) {
     this.left.remove(key);
 }
 else if (key > this.key && this.right) {
     this.right.remove(key);
 }
 else {
     throw new Error('Key Error');
 }
}
_replaceWith(node) {
 if (this.parent) {
 // console.log('this',this)
     if (this == this.parent.left) {
         this.parent.left = node;
     }
     else if (this == this.parent.right) {
         this.parent.right = node;
     }

     if (node) {
         node.parent = this.parent;
     }
 }
 else {
     if (node) {
         this.key = node.key;
         this.value = node.value;
         this.left = node.left;
         this.right = node.right;
     }
     else {
         this.key = null;
         this.value = null;
         this.left = null;
         this.right = null;
     }
 }
}

_findMin() {
 if (!this.left) {
     return this;
 }
 return this.left._findMin();
}

dfs(values=[]) { // inorder
 if (this.left) {
    values = this.left.dfs(values);
 }
 values.push(this.value);

 if (this.right) {
   values = this.right.dfs(values);
 }
 return values;
}
preOrder(values=[]){

    values.push(this.value)
    if (this.left) {
        values = this.left.preOrder(values);
     }
 
     if (this.right) {
       values = this.right.preOrder(values);
     }
     
     return values;
}
postOrder (values=[]){
    
    if (this.left) {
        values = this.left.postOrder(values);
     }
 
     if (this.right) {
       values = this.right.postOrder(values);
     }
     values.push(this.value)
     return values;
}

bfs(tree, values =[]) {

 let Q = new Queue();
  // Assuming a Queue is implemented (refer to previous lesson on Queue)
 const node = tree// says tree.root - but there isn't a prop called root

Q.enqueue(node);
 
 while (Q.len() !== 0) {
     let Qnode= Q.dequeue();
    
         //remove from the queue
     values.push(Qnode.value); // add that value from the queue to an array

     if (Qnode.left !== null) {
        
         Q.enqueue(Qnode.left);
         //add left child to the queue
     }

     if (Qnode.right !== null) {
         Q.enqueue(Qnode.right); // add right child to the queue
     }
 }

 return values;
}

maxProfit2(values=[],array){
  
    let original = array
    let result = []
 
        if (this.left) {
            
            values = this.left.postOrder(values);
         }
     
         if (this.right) {
           
           values = this.right.postOrder(values);
         }
         values.push(this.value)
         console.log(values)
         console.log(values[0]) // lowest 
       
        //values.sort((a,b)=> a - b)
       let past = original.indexOf(values[0])
         for (let i=past;i<original.length; i++){
             result.push(original[i])
         }
        // console.log(values)
        // values[values.length -1] - values[0]
        
        return result[result.length -1] - result[0]
}
maxProfit(array){
  let result = []
  let counter = 1
    for(let i=0; i<array.length;i++){
       
        console.log(array[i])
        
        for (let k=counter;k<array.length; k++){
            console.log(array[i],array[k])
            if(array[i] === array[k]){
                
            } else {
                result.push(array[i] - array[k])
               
            }
        
            
        }
      counter ++
    }
    console.log(result)
    let answer = []
    result.sort((a,b)=> a - b)
    for (let i=0; i<array.length; i++){
        for(let k=1;k<array.length; k++){
            if (array[i] - array[k] === result[0]){
                answer.push(array[i])
                answer.push(array[k])
            }
        }
    }
   
    return answer
}


}

function main (){

let BST = new BinarySearchTree
BST.insert(25,25)
BST.insert(15,15)
BST.insert(50,50)
BST.insert(10,10)
BST.insert(24,24)
BST.insert(35,35)
BST.insert(70,70)
BST.insert(4,4)
BST.insert(12,12)
BST.insert(18,18)
BST.insert(31,31)
BST.insert(44,44)
BST.insert(66,66)
BST.insert(90,90)
BST.insert(22,22)
//console.log(BST)
//console.log(BST.bfs(BST))

//1.
//a. 12,6 --> 8
//b. 12,17,14,15,-1 
function binarySearch(array, value, start, end) {
 var start = start === undefined ? 0 : start;
 var end = end === undefined ? array.length : end;

 if (start > end) {
     return -1;
 }

 const index = Math.floor((start + end) / 2);
 const item = array[index];

 console.log(start,end,item)
 if (item === value) {
  console.log(index)
     return index;
 }
 else if (item < value) {
     return binarySearch(array, value, index + 1, end);
 }
 else if (item > value) {
     return binarySearch(array, value, start, index - 1);
 }
};
//console.log(binarySearch([3,5,6,8,11,12,14,15,17,18],8,0))

//5. Implement different tree traversals 

console.log(BST.dfs())
console.log(BST.preOrder())
console.log(BST.postOrder())

//6. USS enterprise
let Starship = new BinarySearchTree

Starship.insert(10,'Captain Picard')
Starship.insert(9,'Commander Riker')
Starship.insert(11,'Commander Data')
Starship.insert(7,'Lt. Cmdr. Worf')
Starship.insert(13,'Lt. Cmdr. Crusher')
Starship.insert(8,'Lt. Cmdr. LaForge')
Starship.insert(6,'Lieutenant security officer')
Starship.insert(12,'Lieutenant Selar')

console.log(Starship.bfs(Starship))

//7. Max Profit 

let profitCalc = new BinarySearchTree

profitCalc.insert(128,128) 
profitCalc.insert(121,121)
profitCalc.insert(123,123)
profitCalc.insert(98,98)
profitCalc.insert(97,97)
profitCalc.insert(105,105)



let result = profitCalc.maxProfit([128,121,123,98,97,105]) // 
console.log(result)


}

main()
