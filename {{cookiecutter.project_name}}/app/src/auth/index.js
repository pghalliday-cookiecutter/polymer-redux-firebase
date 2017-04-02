import service from '../service';
import {
  isUndefined,
} from 'lodash';
import {
  createSelector,
} from 'reselect';
import Duck from '../duck';

const initialState = {};
const duck = new Duck(
  'auth',
  initialState,
  (state) => state.auth,
);

//
// Selectors
//

// display name helper
const displayName =
  (user) => isUndefined(user.displayName) ? user.email : user.displayName;

// private selectors
const error = duck.selector((state) => state.error);
const pending = duck.selector((state) => state.pending);
const user = duck.selector((state) => state.user);
const email = duck.selector((state) => state.email);

// public selectors
export const hasError = createSelector(
  error,
  (error) => !isUndefined(error),
);

export const getErrorText = createSelector(
  hasError,
  error,
  (hasError, error) => hasError ? error.toString() : '',
);

export const isPending = createSelector(
  pending,
  (pending) => !isUndefined(pending),
);

export const isSignedIn = createSelector(
  user,
  (user) => !isUndefined(user) && user !== null,
);

export const getDisplayName = createSelector(
  isSignedIn,
  user,
  (isSignedIn, user) => isSignedIn ? displayName(user) : '',
);

export const isSignedOut = createSelector(
  isSignedIn,
  isPending,
  (isSignedIn, isPending) => !isSignedIn && !isPending,
);

export const getSubmittedEmail = createSelector(
  email,
  (email) => isUndefined(email) ? '' : email,
);

//
// Private actions
//
const submitSignIn = duck.action('SUBMIT_SIGN_IN');

//
// Public actions
//
export const reset = duck.action('RESET');
export const setUser = duck.action('SET_USER');

export const signInWithGoogle = () => (dispatch) => {
  dispatch(submitSignIn());
  return dispatch(setUser(
    service.signInWithGoogle()
  ));
};

export const signInWithEmailAndPassword = (email, password) => (dispatch) => {
  dispatch(submitSignIn(email));
  return dispatch(setUser(
    service.signInWithEmailAndPassword(email, password)
  ));
};

export const signOut = () => {
  service.signOut();
  return setUser(null);
};

//
// Reducer
//
export default duck.reducer({
  [reset]: () => initialState,
  [submitSignIn]: (state, {payload}) => ({
    pending: true,
    email: payload,
  }),
  [setUser]: (state, {payload, error}) => {
    if (error) {
      return {
        error: payload,
        email: state.email,
      };
    } else {
      return {
        user: payload,
      };
    }
  },
});
