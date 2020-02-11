type Observer<T> = {
  run: () => void
  addSubject: (observable: Observable<T>) => void
}

type Observable<T> = {
  subscribe: (observer: Observer<T>) => void
  unsubscribe: (observer: Observer<T>) => void
  set: (newValue: T) => void
  get: () => T
}

const observersStack: Array<Observer<any>> = []

// Subject creator
export function observable<T>(initialValue: T): Observable<T> {
  let value = initialValue
  const observers: Array<Observer<T>> = []
  return {
    subscribe: function(observer: Observer<T>) {
      observers.push(observer)
    },
    unsubscribe: function(observer: Observer<T>) {
      observers.splice(observers.indexOf(observer), 1)
    },
    set: function(newValue: T) {
      value = newValue
      observers.forEach(o => o.run())
    },
    get: function() {
      // The Subject sends itself to the Observer in global scope (prepare for step 1 in pattern)
      observersStack[observersStack.length - 1] && observersStack[observersStack.length - 1].addSubject(this)
      return value
    },
  }
}

export function autorun<T>(fn: Function) {
  const subjects: Array<Observable<T>> = []
  // Observer Instance
  const reaction: Observer<T> = {
    // Add Subject to the list (step 1 from pattern)
    addSubject: (subject: Observable<T>) => {
      subjects.push(subject)
    },
    run: function() {
      observersStack.push(this) // Save the Observer in a global scope
      subjects.splice(0).forEach(s => s.unsubscribe(this)) // Unsubscribes from all Subjects, empty subjects list
      fn() // Run all get methods
      subjects.forEach(s => s.subscribe(this)) // The Observer subscribes to all subjects (steps 2,3 in pattern)
      observersStack.pop()
    },
  }
  reaction.run()
  return () => subjects.splice(0).forEach(s => s.unsubscribe(reaction))
}
