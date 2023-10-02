
export default class BinaryART1 {
    private vigilance: number;
    private beta: number;
    public clusters : Claster[];
    private vectorSize : number

    constructor(beta: number, vectorSize: number, vigilance: number) {
        this.vigilance = vigilance;
        this.beta = beta;
        this.clusters = [];
        this.vectorSize = vectorSize;
    }

    train(input: number[][]): void {
        this.clusters.push(new Claster(input[0]));
        for (let index = 0; index < 10; index++) {
            debugger
            for (let i = 0; i < input.length; i++) {
                let j = 0;
                for (; j < this.clusters.length; j++) {
                    if (this.clusters[j].isChildrenHasOwn(input[i])) {
                        continue
                    }
    
                    if ( this.isPassedAllTests(input[i], this.clusters[j].prototype)) {
                        this.findVectorInAllClasterAndDel(this.clusters, input[i], j)
                        this.clusters[j].addChild(input[i]);
                        break;
                    }
                }
                if (j === this.clusters.length) {
                    this.findVectorInAllClasterAndDel(this.clusters, input[i], -1)
                    const newCluster = new Claster(input[i]);
                    newCluster.addChild(input[i]);
                    this.clusters.push(newCluster);
                    
                }
            }
        
        }
    }

    private isPassedAllTests(vector : number[], vectorPrototype : number[]) {
        return this.similarityTest(vector, vectorPrototype) && this.vigilanceTest(vector, vectorPrototype);
    }

    private vigilanceTest(vector : number[],  vectorPrototype: number[]): boolean {
        const byteAndImportance = this.getImportance(vectorPrototype.map((el, i) => el & vector[i]))
        
        return byteAndImportance / this.getImportance(vector) >= this.vigilance
    }

// Функция для теста на схожесть
    private similarityTest(vector : number[],  vectorPrototype: number[]): boolean {
        const byteAndImportance = this.getImportance(vectorPrototype.map((el, i) => el & vector[i]))
        const firstDrob = byteAndImportance / (this.beta + this.getImportance(vectorPrototype))

        const secondDrob = (this.getImportance(vector) / (this.beta + vector.length))

        return firstDrob > secondDrob ;
    }

    private getImportance(vector : number[]) : number {
        return vector.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    private findVectorInAllClasterAndDel(clusters : Claster[], vectorE : number[], ignoreIndex : number) {
        let delIndex = -1;

        for (let i = 0; i < clusters.length; i++) {
            if (i !== ignoreIndex) {
                if ((delIndex = clusters[i].children.indexOf(vectorE)) !== -1) {
                    clusters[i].children.splice(delIndex, 1);
                    return
                }
            }
        }
    }

}

export class Claster {
    public prototype : number[]
    public children : Array<number[]>;

    constructor(prototype: number[]) {
        this.prototype = [...prototype];
        this.children = [];
    }

    public isChildrenHasOwn(vectorChild : number[]) : boolean {
        return this.children.includes(vectorChild);
    }

    public addChild(vectorChild : number[]) {
        this.children.push(vectorChild);
        this.changePrototype(vectorChild);
    }

    public changePrototype(newChild : number[]) {
        this.prototype = this.prototype.map((el, i) => el & newChild[i])
    }
}