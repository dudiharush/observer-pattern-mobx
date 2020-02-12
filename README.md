# Mobx - Observer Pattern In Javascript

Two implementation of the Observer pattern in Mobx - a simple version and a more complex one

## Install and Run

npm i\
npm start

## Observer Pattern

Steps:

1. The Observer gets a Subject
2. The Observer sends itself to the subscribe method of the Subject.
3. The Subject adds the Observer to his observers list.

## Mobx (simplified)

Steps:

1. The Observer is saved in a global scope (steps 1,2 from pattern)
2. The Subject adds the Observer from global scope (step 3 from pattern)

## Mobx (more complex)

Descriptions:
autorun = 1 Observer with multiple Subjects (observables) registration calls.
We keep a list of subjects in the autorun, so we can unsbscribe the observer from all of them
Unlike the simplified version above, where the Subject adds the Observer directly,
the Subject sends itself to the Observer, and the observer is not only calling the register (add Subject) of the Subject, but first it adds the subject to a subjects list, so we can unsubscribe the observer from all the subjects.

Steps:

1. The Observer saved in a global scope, unsubscribes from all Subjects (clear subjects list, prepare for step 1 in pattern)
2. thunk run: The Subject sends itself to the Observer in global scope, which adds the Subject to a list (step 1 from pattern) x num of Subjects
3. The Observer subscribes to subjects in the list (steps 2, 3 in pattern)

from: RuhrJS 2016 https://www.youtube.com/watch?v=TfxfRkNCnmk
