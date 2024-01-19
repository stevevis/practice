
interface Layer {
  id: string
  properties: {
    [property: string]: any
  }
}

interface Command {
  id: string
  property: string
  prevValue: any | undefined
}

interface Batch {
  history: Command[]
}

class Doc {
  private layers: { [key: string] : Layer  }
  private history: { [key: string] : any  }
  private batchHistory: Array<Batch> 

  // Setup the initial document and all necessary data structures.
  constructor(layers: Layer[]) {
    this.layers = {};
    for (let i = 0; i < layers.length; i++) {
      this.layers[layers[i].id] = layers[i];
    }
    this.history = new Array<Command>();
    this.batchHistory = new Array<Batch>();
  }
  
  layerById(id: string): Layer {
    return this.layers[id];
  }
   
  apply(id: string, property: string, value: any) {
    const layer = this.layers[id];
    if (layer === undefined) {
      throw new Error("missing layer");
    }
    const key = `${id}:${property}`;
    if (!this.history[key]) {
      this.history[key] = layer.properties[property];
    }
    layer.properties[property] = value;
  }
  
  undo() {
    if (this.history.length > 0) {
      const command = this.history.shift();
      if (command !== undefined) {
        const layer = this.layers[command.id];
        layer.properties[command.property] = command.prevValue;
      }
    }
  }

  commit_batch() {
    // TODO
  }
}

// function test_apply_and_undo() {
//   const document = new Doc([
//     { id: 'a', properties: { color: 'red' }},
//     { id: 'b', properties: { shape: 'triangle' }},
//   ])

//   document.apply('a', 'color', 'green')
//   document.apply('b', 'shape', 'square')
//   document.apply('a', 'color', 'blue')

//   document.undo()
//   expect(document.layerById('a').properties['color']).to.equal('green')
//   expect(document.layerById('b').properties['shape']).to.equal('square')

//   document.apply('a', 'color', 'purple')
//   expect(document.layerById('a').properties['color']).to.equal('purple')
//   expect(document.layerById('b').properties['shape']).to.equal('square')

//   document.undo()
//   expect(document.layerById('a').properties['color']).to.equal('green')
//   expect(document.layerById('b').properties['shape']).to.equal('square')

//   document.undo()
//   expect(document.layerById('a').properties['color']).to.equal('green')
//   expect(document.layerById('b').properties['shape']).to.equal('triangle')

//   document.undo()
//   expect(document.layerById('a').properties['color']).to.equal('red')
//   expect(document.layerById('b').properties['shape']).to.equal('triangle')
// }



// Part 2: add a method called `commit_batch()` that allows multiple changes to
// be batched together. The document is still changed during each 'apply()', but 
// each 'undo()' call reverts the last batch of changes.
// 
// You can assume that `commit_batch()` will _always_ be called before `undo()`.
function test_commit_batch() {
  const document = new Doc([
    { id: 'a', properties: { color: 'red' }},
    { id: 'b', properties: { shape: 'triangle' }},
  ])
  
  document.apply('a', 'color', 'green')
  document.apply('a', 'color', 'blue')
  document.apply('b', 'shape', 'square')
  document.commit_batch()

  document.apply('a', 'color', 'purple')
  document.apply('a', 'color', 'orange')
  document.commit_batch()

  document.undo()
  expect(document.layerById('a').properties['color']).toEqual('blue')
  expect(document.layerById('b').properties['shape']).toEqual('square')

  document.undo()
  expect(document.layerById('a').properties['color']).toEqual('red')
  expect(document.layerById('b').properties['shape']).toEqual('triangle')
}
console.log("Running tests..");
test_commit_batch()
console.log("Tests succeeded!")