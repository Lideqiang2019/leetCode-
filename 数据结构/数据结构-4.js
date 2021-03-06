/**
 * 226 反转二叉树 https://leetcode-cn.com/problems/invert-binary-tree/
 */
var invertTree = function(root) {
    /**
     * 明确invertTree含义，代表是将root作为根节点的左右子树反转,
     * 那么只要递归找到根，将左右子树交换位置即可
     */
    // 在这里操作,左右子树换位问题
    if(root==null) return null
    // if(root.left==null && root.right==null) return
    let tmp = root.left
    root.left = root.right
    root.right = tmp
    // 前序遍历,找到root即可
    invertTree(root.left)
    invertTree(root.right)
    return root
};

/**
 * 116. 填充每个节点的下一个右侧节点指针 https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/
 */
var connect = function(root) {
    
    connectTwoNode(root)
    return root
};

var connectTwoNode = function (root){
    // 把一颗树的每一层的任意两个节点连接，增加一句即可
    if(root==null) return null
    if(root.left==null && root.right==null) return // 递归停止

    root.left.next = root.right

    if(root.next){
        // 对于当前的节点，右子树已经被其父亲节点“穿透”了
        root.right.next = root.next.left
    }

    connectTwoNode(root.left)
    connectTwoNode(root.right)
}

var flatten = function(root) {
    /**
     * 明确flatten的含义为将当前节点的右子树放到左子树上并返回链表的头节点
     */
    if(root==null) return 
    flatten(root.left)
    flatten(root.right)

    // 在后续遍历这里执行对root的操作
    let le = root.left
    let ri = root.right

    // 将左子树作为root的右子树
    root.left = null
    root.right = le

    // 将原来的左子树走到底，将能加上右子树
    let p = root
    while(p.right!=null){
        p = p.right
    }
    p.right = ri
};

/**
 * 654. 构造最大二叉树
 */
var constructMaximumBinaryTree = function(nums) {
    return buildTree(nums, 0, nums.length-1)
    function buildTree(nums, lo, hi){
        // 求得最大值和其index
        if(lo>hi) return null
        let index = 0 , maxNum = -1000
        for(let i=lo;i<=hi;i++){
            if(nums[i]>maxNum){
                maxNum = nums[i]
                index = i
            }
        }

        let root = new TreeNode(maxNum)

        root.left = buildTree(nums,lo,index-1)
        root.right = buildTree(nums,index+1,hi)

        return root
    }
};

var buildTree = function(preorder, inorder) {
    /**105. 从前序与中序遍历序列构造二叉树
     * 找到构造的root节点，前序和中序都要找,传入前序和中序的数组，这个数组是以root为节点的，返回以root为根节点的树
     */
    if(!preorder.length || !inorder.length) return null
    let root = new TreeNode(preorder[0])
    let index = inorder.indexOf(preorder[0])

    root.left = buildTree(preorder.slice(1, index+1), inorder.slice(0,index))
    root.right = buildTree(preorder.slice(index+1), inorder.slice(index+1))

    return root
};

/**
 * 106. 从中序与后序遍历序列构造二叉树
 * @param {*} inorder 
 * @param {*} postorder 
 * 
 */

var buildTree = function(inorder, postorder) {
    /**
     * 与前序+中序的解法类似，就是需要从后向前分左右子树
     */
    if(!inorder.length || !postorder.length) return null

    let len = postorder.length-1
    let root = new TreeNode(postorder[len])
    let index = inorder.indexOf(postorder[len])

    root.right = buildTree(inorder.slice(index+1), postorder.slice(index,len))
    root.left = buildTree(inorder.slice(0,index), postorder.slice(0,index))

    return root
};

/**
 * 652. 寻找重复的子树
 */

let b = new Map()
let a = 'a'
if(!b.has(a)){
    b.set(a,0)
}
let freq = b.get(a)

b.set(a,freq+1)
console.log(b)

var findDuplicateSubtrees = function(root) {
    const treeMap = new Map()
    const result = []
    function traversal(root) {
        if(!root) {
            return '#'
        }
        const left = traversal(root.left)
        const right = traversal(root.right)
        const subtree = `${left},${right},${root.val}`
        if(treeMap.get(subtree)) {
            treeMap.set(subtree, treeMap.get(subtree)+1)
        } else {
            treeMap.set(subtree, 1)
        }
        if(treeMap.get(subtree) === 2) {
            result.push(root)
        }
        return subtree
    }
    traversal(root)
    return result
};


var MyQueue = function() {
    this.stack1 = [] // 队尾
    this.stack2 = [] // 队头
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stack1.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    this.peek()
    return this.stack2.pop()
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    // 先将stack1中的元素弹出，放入stack2中
    if(this.stack2.length===0){
        while(this.stack1.length!==0){
            this.stack2.push(this.stack1.pop())
        }
    }

    return this.stack2[this.stack2.length-1]
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.stack2.length===0 && this.stack1.length===0
};


MyStack.prototype.push = function(x) {
    this.stack.push(x)
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
    if(this.empty()){
        return undefined
    }
    let tmp = this.stack[this.stack.length-1]
    this.stack.length = this.stack.length-1
    return tmp
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
    return this.stack[this.stack.length-1]
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    return this.stack.length===0
};

/**
 * 99. 恢复二叉搜索树
 */
var recoverTree = function(root) {
    let err1 = null, err2 = null;
    let pre = new TreeNode(-Infinity);
    traverse(root);
    // 交换两个错误节点
    let tmp = err1.val;
    err1.val = err2.val;
    err2.val = tmp;

    function traverse(root){
        if(!root){
            return;
        }
        traverse(root.left);
        // 需要交换节点顺序
        if(root.val<pre.val && err1==null){
            // 记录第一个错误点
            err1 = pre;
        }
        if(root.val<pre.val && err1!=null){
            err2 = root;
        }

        pre = root;
        traverse(root.right);
    }
};
