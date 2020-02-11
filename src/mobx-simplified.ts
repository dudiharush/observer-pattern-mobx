type Reaction = Function | undefined

// Observer instance
let reaction: Reaction

// Subject Creator
function observeProp<T>(o: object, propName: string, propValue: T) {
  const dependencies = new Set<Reaction>()
  Object.defineProperty(o, propName, {
    get() {
      if (reaction) {
        //The Subject Adds the Observer from global scope (3 from pattern)
        dependencies.add(reaction)
      }
      return propValue
    },
    set(value) {
      propValue = value
      for (const dependency of Array.from(dependencies)) {
        dependency && dependency()
      }
      return value // used for o.x = o.y = 1
    },
  })
}

// Subject
export function observable<T>(o: Record<string | number, T>) {
  const props = Object.entries(o)
  for (const [propName, propValue] of props) {
    observeProp(o, propName, propValue)
  }
  return o
}

export function autorun(fn: Function) {
  //The Observer is saved in a global scope (steps 1,2 from pattern)
  reaction = fn
  fn()
  reaction = undefined
}
