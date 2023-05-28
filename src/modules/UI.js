import Tree from "./BST";

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let tree = new Tree(arr)


export default class UI {
    static loadPage() {
        const display = document.querySelector('.display')
        const balanced = document.querySelector('.balanced-out')
        const inorder = document.querySelector('.inorder-out')
        const preorder = document.querySelector('.preorder-out')
        const postorder = document.querySelector('.postorder-out')
        const levelorder = document.querySelector('.levelorder-out')
        const input = document.querySelector('.input-array')
        const answer = document.querySelector('.answer')

        answer.textContent = ''

        balanced.textContent = tree.isBalanced()

        let ans = []
        tree.inorder(ans)
        inorder.textContent = ans

        ans = []
        tree.preorder(ans)
        preorder.textContent = ans
        arr = ans

        ans = []
        tree.postorder(ans)
        postorder.textContent = ans

        ans = []
        tree.levelorder(ans)
        levelorder.textContent = ans

        input.value = arr.toString()

        let out = []
        tree.prettyPrint(out)
        display.innerHTML = ""
        for (let s of out) {
            display.innerHTML += s + '<br>'
        }

        UI.addEventHandlers()
    }

    static addEventHandlers() {
        const buildBtn = document.querySelector('.build-btn')
        const insertBtn = document.querySelector('.insert-btn')
        const deleteBtn = document.querySelector('.delete-btn')
        const reablanceBtn = document.querySelector('.rebalance-btn')
        const findBtn = document.querySelector('.find-btn')

        buildBtn.addEventListener('click', UI.buildTree)
        insertBtn.addEventListener('click', UI.insertNode)
        deleteBtn.addEventListener('click', UI.deleteNode)
        findBtn.addEventListener('click', UI.findDepth)
        reablanceBtn.addEventListener('click', UI.rebalanceTree)
    }

    static buildTree() {
        const input = document.querySelector('.input-array')
        arr = input.value.split(',')
        
        tree = new Tree(arr)
        UI.loadPage()
    }

    static insertNode() {
        const input = document.querySelector('.input-insert')
        tree.insert(parseInt(input.value))
        UI.loadPage()
        input.value = ''
    }

    static deleteNode() {
        const input = document.querySelector('.input-delete')
        tree.delete(parseInt(input.value))
        UI.loadPage()
        input.value = ''
    }

    static findDepth() {
        const input = document.querySelector('.input-find')
        const ans = document.querySelector('.answer')
        ans.textContent = tree.depth(tree.find(parseInt(input.value)))
        input.value = ''
    }

    static rebalanceTree() {
        tree.rebalance()
        UI.loadPage()
    }
}