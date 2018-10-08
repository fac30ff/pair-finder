import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

const FETCHING_PEOPLE = 'FETCHING_PEOPLE';
const FETCHED_PEOPLE = 'FETCHED_PEOPLE';

const POPULATION_SIZE = 1000;

const initialState = {
    fetchingPeople: false,
    people: [],
    pairs: [],
  tempPairs: []
};

const getNumberByWord = (word) =>
    [].reduce.call(word, (acc, char, index) => acc + char.charCodeAt() * Math.pow(10, index % 3), 0) % 10000;

const pifagor = (x1, x2, y1, y2) => Math.sqrt(Math.abs((x2*x2 - x1*x1)) + Math.abs((y2*y2 - y1*y1)));

const pairing = (p1, p2) => pifagor(p2.x, p1.x, p2.y, p1.y);


function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case FETCHING_PEOPLE:
            return {
                ...state,
                fetchingPeople: true,
            };
      case FETCHED_PEOPLE:
            const tempPairs = action.people.forEach(person => {
                person.firstname = person.name.first;
                person.lastname = person.name.last;
                person.x = getNumberByWord(person.name.first);
                person.y = getNumberByWord(person.name.last);
                delete person.name;
            });
            let pairs = [];
          action.people.forEach((p1, x) => {
              action.people.forEach((p2, y) => {
                  if (x !== y && p1.firstname !== p2.firstname && p1.lastname !== p2.lastname) {
                    pairs.push({
                      x: x,
                      y: y,
                      distance: pairing(p1, p2)
                    })
                  }
              }
                  )
          })
          pairs.sort((p1, p2) => p1.distance - p2.distance);
          console.log(pairs);
            return {
                ...state,
                fetchingPeople: false,
                people: action.people,
              tempPairs: [...state.tempPairs, tempPairs],
                pairs: pairs
            };
        default:
            return state;
    }
}

export class actionCreator {
    static fetchPeople() {
        return dispatch => {
            dispatch({ type: FETCHING_PEOPLE });
            fetch(`https://randomuser.me/api/?results=${POPULATION_SIZE}&nat=gb&inc=name&noinfo`).then(response => response.json().then((res) => {
                dispatch({ type: FETCHED_PEOPLE, people: res.results });
            }));
        }        
    }
}

export default function createRootStore() {
    const store = createStore(
        combineReducers({ root: reducer }),
        {},
        applyMiddleware(thunkMiddleware)
    );
    return store;
}