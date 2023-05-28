class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

export default class Tree {
    constructor(arr) {
        arr = Array.from(new Set(arr.sort((a,b)=> a-b)))
        this.root = this.buildTree(arr, 0, arr.length-1)
    }
    
    prettyPrint(out, node=this.root, prefix = "", isLeft = true) {
        if (node === null)
          return;

        if (node.right !== null)
          this.prettyPrint(out, node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);

        out.push(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null)
          this.prettyPrint(out, node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);

    }

    buildTree(arr, s, e) {
        if (s > e) return null;

        let m = Math.floor((s+e)/2)
        let node = new Node(arr[m])
        node.left = this.buildTree(arr, s, m-1)
        node.right = this.buildTree(arr, m+1, e)

        return node;
    }

    insert(value) {
        let cur = this.root
        while (cur) {
            if (value < cur.value) {
                if (!cur.left) {
                    cur.left = new Node(value)
                    return;
                } else
                    cur = cur.left
            } else {
                if(!cur.right) {
                    cur.right = new Node(value)
                    return
                } else 
                    cur = cur.right
            }
        }
    }

    delete(value, node=this.root) {
        if (!node) return null;

        if (node.value === value) {
            // only left
            if (node.right === null) 
                return node.left;
            // only right
            if (node.left === null)
                return node.right;
            // both child (find largest left data)
            const findLargestLeftData = (cur) => {
                let max = cur.value
                while (cur.right) {
                    max = cur.right.value
                    cur = cur.right
                }

                return max;
            }

            node.value = findLargestLeftData(node.left)
            node.left = this.delete(node.value, node.left)

        } else if (node.value < value)
            node.right = this.delete(value, node.right)
        else
            node.left = this.delete(value, node.left)

        return node
    }

    find(value) {
        let cur = this.root
        while (cur) {
            if (value === cur.value)
                return cur;
            
            if (value < cur.value)
                cur = cur.left
            else
                cur = cur.right
        }
        return null;
    }

    levelorder(ans) {
        if (!this.root) return

        let q = []
        q.push(this.root)

        while (q.length > 0) {
            let front = q.shift()
            ans.push(front.value)

            if (front.left) q.push(front.left)
            if (front.right) q.push(front.right)
        }
    }

    inorder (ans, node=this.root) {
        if (!node)
            return;

        ans.push(node.value)
        this.inorder(ans, node.left)
        this.inorder(ans, node.right)
    }

    preorder(ans, node=this.root) {
        if (!node)
            return;

        this.preorder(ans, node.left)
        ans.push(node.value)
        this.preorder(ans, node.right)
    }

    postorder(ans, node=this.root) {
        if (!node)
            return;

        this.postorder(ans, node.left)
        this.postorder(ans, node.right)
        ans.push(node.value)
    }

    height(node=this.root) {
        if (!node) return 0;

        let lHeight = this.height(node.left)
        let rHeight = this.height(node.right)

        return Math.max(lHeight, rHeight) + 1;
    }

    depth(node) {
        let cur = this.root
        let depth = 0

        while (cur) {
            depth += 1
            if (cur === node) return depth;
            if (node.value < cur.value)
                cur = cur.left
            else
                cur = cur.right
        }
    }

    isBalanced() {
        let lHeight = this.height(this.root.left)
        let rHeight = this.height(this.root.right)

        return Math.abs(lHeight-rHeight) <= 1;
    }

    rebalance() {
        let arr = []
        this.preorder(arr)
        this.root = this.buildTree(arr, 0, arr.length-1)
    }

}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
arr = Array.from(new Set(arr.sort((a,b)=> a-b)))

let out = []

//let tree = new Tree(arr)
//tree.prettyPrint(out)
//for (let s of out)
//    console.log(s)

//tree.insert(0)
//tree.prettyPrint()
//
//let node = tree.find(67)
//console.log(node)
//
//let ans = []
//tree.inorder(ans)
//console.log(ans)
//
//ans = []
//tree.preorder(ans)
//console.log(ans)
//
//ans = []
//tree.postorder(ans)
//console.log(ans)
//
//ans = []
//tree.levelorder(ans)
//console.log(ans)
//
//console.log(tree.height(tree.find(0)))
//console.log(tree.depth(tree.find(6345)))
//
//console.log(tree.isBalanced())
//
//tree.insert(100)
//tree.insert(200)
//tree.insert(300)
//tree.prettyPrint()
//console.log(tree.isBalanced())
//
//tree.rebalance()
//tree.prettyPrint()
//console.log(tree.isBalanced())
//
//tree.delete(9)
//tree.prettyPrint()