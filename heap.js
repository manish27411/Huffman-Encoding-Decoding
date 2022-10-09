

export { BinaryHeap }

class BinaryHeap {

    constructor() {
        this.heap = [];
    }

    insert(value) {
        // inserting at ending
        this.heap.push(value);
        // heapify

        this.bubbleUp();
    }

    size() {
        return this.heap.length;
    }

    empty(){
        return ( this.size()===0 );
    }

    //using iterative approach
    bubbleUp() {
        let index = this.size() - 1;

        while (index > 0) {
            let element = this.heap[index],
                parentIndex = Math.floor((index - 1) / 2),
                parent = this.heap[parentIndex];

            if (parent[0] <= element[0]) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex
        }
    }

    extractMin() {
        const max = this.heap[0];
        const tmp = this.heap.pop();
        if(!this.empty()) {
            this.heap[0] = tmp;
            this.sinkDown(0);
        }
        return max;
    }

    sinkDown(index) {

        let left = 2 * index + 1,
            right = 2 * index + 2,
            smallest = index;
        const length = this.size();

        // console.log(this.heap[left], left, length, this.heap[right], right, length, this.heap[smallest]);

        if (left < length && this.heap[left][0] < this.heap[smallest][0]) {
            smallest = left
        }
        if (right < length && this.heap[right][0] < this.heap[smallest][0]) {
            smallest = right
        }
        // swap
        if (smallest !== index) {
            let tmp = this.heap[smallest];
            this.heap[smallest] = this.heap[index];
            this.heap[index] = tmp;
            this.sinkDown(smallest)
        }
    }
}
Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Huffman_Encode_Decode/heap.js at main · Sunny232002/Huffman_Encode_Decode
