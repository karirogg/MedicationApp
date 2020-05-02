import {combineReducers} from 'redux';
import MedsReducer from './meds-reducer';

const allReducers = combineReducers({
    meds: MedsReducer
});

export default allReducers;