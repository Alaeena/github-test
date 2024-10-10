import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import Storage from '@/util/Storage';

// Reducer Function
const DrawContext = createContext();
const initState = Storage.get();

const clamp = (number, min, max) => {
    return Math.max(min, Math.min(number, max));
};
const wrapper = (type, payload) => ({ type, payload });
function reducer(state, action) {
    const payload = action.payload;
    let newState = {};

    switch (action.type) {
        case 'Update':
            state.data[payload] = state.data[payload] ? state.data[payload] + 1 : 1;
            newState = { ...state };
            Storage.set(newState);
            return newState;
        case 'Clear':
            newState = { ...state, data: {} };
            Storage.set(newState);
            return newState;
        case 'Toggle':
            newState = { ...state, allowSpecial: payload };
            Storage.set(newState);
            return newState;
        case 'Set':
            newState = { ...state, allowDrawable: payload };
            Storage.set(newState);
            return newState;
        case 'Range': {
            let { stopHour, stopMinute, releaseHour, releaseMinute } = payload;
            stopHour = clamp(stopHour, 0, 23);
            releaseHour = clamp(releaseHour, 0, 23);
            stopMinute = clamp(stopMinute, 0, 59);
            releaseMinute = clamp(releaseMinute, 0, 59);
            if ((releaseHour == stopHour && releaseMinute <= stopMinute) || releaseHour < stopHour) {
                return state;
            }
            newState = { ...state, stopHour, stopMinute, releaseHour, releaseMinute };
            Storage.set(newState);
            return newState;
        }
        default:
    }
}
function DrawProvider({ children }) {
    const [storage, dispatch] = useReducer(reducer, initState);

    const Update = (data) => dispatch(wrapper('Update', data));
    const Toggle = (data) => dispatch(wrapper('Toggle', data));
    const Set = (data) => dispatch(wrapper('Set', data));
    const Range = (data) => dispatch(wrapper('Range', data));
    const Clear = () => dispatch({ type: 'Clear' });

    const action = { Update, Toggle, Clear, Set, Range };
    return <DrawContext.Provider value={{ storage, action }}>{children}</DrawContext.Provider>;
}
DrawProvider.propTypes = {
    children: PropTypes.any.isRequired,
};
export { DrawContext, DrawProvider };
