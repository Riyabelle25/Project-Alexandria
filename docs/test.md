# Testing Minimum Functionality

In order to enter Alexandria and use any of it's functionalities, you need to sign-in with your Google account.

![Login](img/login.png)

## Working

User Authentication in Alexandria has been done with Firebase Authentication Services, using the user's Google Account. If you try to access any of Alexandria's routes without being signed-in, you shall be prompted to sign in.

    // generates pop-up window prompting user to sign in with Google account
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    };

A User's state management has been done with the help of Redux slices. As soon as you signout, the state is updated, and you'll be redirected to Login UI.

    export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
        state.user = action.payload;
        },
        logout: (state) => {
        state.user = false;
        },
    },
    });

    export const { login, logout } = userSlice.actions;
    export const selectUser = (state) => state.user.user;
    export default userSlice.reducer;

All users are stored as documents in the Firestore, under collection `users\`. Each User document's ID is the `userID` (`auth.currentUser.uid`) and has attribute `userName` (`auth.cuurentUser.displayName`).

## Troubleshooting

You need to be online with a good internet connection while using this app. Incase you run into problems with Firebase connections, a message will pop up.
