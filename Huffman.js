import { BinaryHeap } from './heap.js';

export { HuffmanCoder }

class HuffmanCoder{
 
    stringify(node){
        if(typeof(node[1])==="string"){
            return '\''+node[1];
        }

        return '0' + this.stringify(node[1][0]) + '1' + this.stringify(node[1][1]);
    }

    display(node, modify, index=1){
        if(modify){
            node = ['',node];
            if(node[1].length===1)
                node[1] = node[1][0];
        }

        if(typeof(node[1])==="string"){
            return String(index) + " = " + node[1];
        }

        let left = this.display(node[1][0], modify, index*2);
        let right = this.display(node[1][1], modify, index*2+1);
        let res = String(index*2)+" <= "+index+" => "+String(index*2+1);
        return res + '\n' + left + '\n' + right;
    }

    destringify(data){
        let node = [];
        if(data[this.ind]==='\''){
            this.ind++;
            node.push(data[this.ind]);
            this.ind++;
            return node;
        }
 
        this.ind++;
        let left = this.destringify(data);
        node.push(left);
        this.ind++;
        let right = this.destringify(data);
        node.push(right);
        
        return node;
    }

    getMappings(node, path){
        if(typeof(node[1])==="string"){
            this.mappings[node[1]] = path;
            return;
        }
        //  a: 01100
        // console.log(node[1])
        this.getMappings(node[1][0], path+"0");
        this.getMappings(node[1][1], path+"1");
    }

    encode(data){

        this.heap = new BinaryHeap();

        const mp = new Map();
        for(let i=0;i<data.length;i++){
            if(data[i] in mp){
                mp[data[i]] = mp[data[i]] + 1;
            } else{
                mp[data[i]] = 1;
            }
        }

        for(const key in mp){
              //in Heap{frq,char} 
            this.heap.insert([mp[key], key]);
        }

        while(this.heap.size() > 1){
            const node1 = this.heap.extractMin();
            const node2 = this.heap.extractMin();

            const node = [node1[0]+node2[0],[node1,node2]];
            this.heap.insert(node);
        }
        const huffman_encoder = this.heap.extractMin();
        console.log(huffman_encoder);
        console.log(typeof(huffman_encoder))
        this.mappings = {};
        this.getMappings(huffman_encoder, "");
       // ENCODED string
        let binary_string = "";
        for(let i=0;i<data.length;i++) {
            binary_string = binary_string + this.mappings[data[i]];
        }
        // console.log(binary_string);

        let rem = (8 - binary_string.length%8)%8;
        let padding = "";
        for(let i=0;i<rem;i++)
            padding = padding + "0";
        binary_string = binary_string + padding;
        // console.log(binary_string);
       //ab  :[2:[[1:a],[1:b]]]<- root;

        let result = "";
        //  for abbbca binary string: 11000101 10000000
        for(let i=0;i<binary_string.length;i+=8){
            let num = 0;
            //Binary to decimal convertion using  continous 8bits
            for(let j=0;j<8;j++){

                num = num*2 + (binary_string[i+j]-"0");
            }
            result = result + String.fromCharCode(num);
        }
        //  console.log(result);
        let final_res = this.stringify(huffman_encoder) + '\n' + rem + '\n' + result;
        let info = "Compression Ratio : " + data.length/final_res.length;
        info = "Compression complete and file sent for download" + '\n' + info;
        // console.log(final_res);
        alert(info);
        return [final_res, this.display(huffman_encoder, false), info];
    }

decode(data){
        data = data.split('\n');
        if(data.length===4){
            // Handling new line
            data[0] = data[0] + '\n' + data[1];
            data[1] = data[2];
            data[2] = data[3];
            data.pop();
        }

        this.ind = 0;
        console.log('before')
        const huffman_decoder = this.destringify(data[0]);
        console.log('after')
        const text = data[2];
        
        let binary_string = "";
        for(let i=0;i<text.length;i++){
            let num = text[i].charCodeAt(0);
            let bin = "";
            for(let j=0;j<8;j++){
                bin = num%2 + bin;
                num = Math.floor(num/2);
            }
            binary_string = binary_string + bin;
        }
        binary_string = binary_string.substring(0,binary_string.length-data[1]);

        console.log(binary_string.length);
        // 110001011  abbbca
        let res = "";
        let node = huffman_decoder;
        for(let i=0;i<binary_string.length;i++){
            if(binary_string[i]==='0'){
                node = node[0];// calling left
            } else{
                node = node[1];// calling right
            }

            if(typeof(node[0])==="string"){
                res += node[0];
                node = huffman_decoder;
            }
        }
        
        let info = "Decompression complete and file sent for download";
        alert(info);
         return [res, this.display(huffman_decoder, true), info];
    }
}
