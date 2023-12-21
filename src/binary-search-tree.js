const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.rootNode = null;
    }

    root() {
        return this.rootNode;
    }

    add(data) {
        const newNode = new Node(data);
        if (this.#checkRoot()) {
            this.rootNode = newNode;
        } else {
            this.#insertNode(this.rootNode, newNode);
        }
    }

    has(data) {
        return !this.#checkRoot() && !!this.find(data);
    }

    find(data) {
        return this.#findNode(this.rootNode, data)
            ? this.#findNode(this.rootNode, data)
            : null;
    }

    #findNode(node, data) {
        if (node === null) return false;
        if (node.data === data) {
            return node;
        } else if (data > node.data) {
            return this.#findNode(node.right, data);
        } else if (data < node.data) {
            return this.#findNode(node.left, data);
        }
    }

    remove(data) {
        return this.#removeNode(this.rootNode, data);
    }

    #removeNode(node, data) {
        if (data > node.data) {
            node.right = this.#removeNode(node.right, data);
        } else if (data < node.data) {
            node.left = this.#removeNode(node.left, data);
        } else {
            if (node.left === null && node.right === null) {
                node = null;
            } else if (node.left === null) {
                node = node.right;
            } else if (node.right === null) {
                node = node.left;
            } else {
                const minRight = this.#findMin(node.right);
                node.data = minRight;
                node.right = this.#removeNode(node.right, minRight);
            }
        }
        return node;
    }

    min() {
        if (this.#checkRoot()) {
            return null;
        }
        return this.#findMin(this.rootNode);
    }

    #findMin(node) {
        if (node.left === null) {
            return node.data;
        } else {
            return this.#findMin(node.left);
        }
    }

    max() {
        if (this.#checkRoot()) {
            return null;
        }
        return this.#findMax(this.rootNode);
    }

    #findMax(node) {
        if (node.right === null) {
            return node.data;
        } else {
            return this.#findMax(node.right);
        }
    }

    #insertNode(node, newNode) {
        if (newNode.data > node.data) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.#insertNode(node.right, newNode);
            }
        }
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.#insertNode(node.left, newNode);
            }
        }
    }

    #checkRoot() {
        return this.rootNode === null;
    }
}

module.exports = {
    BinarySearchTree,
};
