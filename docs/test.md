# Testing Minimum Functionality

Here's what you can do to just test the Minimum Functionality and Adapt Phase Challenge tasks:

## Steps

- Sign in using your Google account.
- Enter `BookClub`.
- See the `Meeting Logs` from previous test runs as you scroll down General
- `Start a Meeting` from the Header
- You'll be redirected to the pre-meeting UI and fill in your name (a random name is already there in the input)
- On entering the Meeting, copy the invite link from the top and paste it into your **mobile phone's google chrome** to join in from your phone. Or, you can paste it into another tab on your PC itself and join as the second user.
- As I am using `STUN` servers to accomodate remote users (and not pre-built Services), the time it takes for another user to join in can take anything between **30s to 2 minutes**. Please be patient 😅
- This has been built using `ReactJS` for the Client-Side, `ExpressJS` for the Server-Side and `socket.io` and `PeerJS` library for facilitating the Video Call.
- You can `mute/unmute`, `switch camera on/off` and `share screen` as well.
- There's inbuilt `Chat` Functionality, and messages exchanged here shall be displayed as `Meeting Logs` in the ChatBox when you end the meeting.

## Troubleshooting

I have tested Alexandria's functionalities out with my friends, seniors- even with my Mentor at the Engage Programme, multiple times; and know that everything is good. But then-

    `Murphy's Law: "Anything that can go wrong, will go wrong"`

Thus, the significance of this section.

- If you encounter a blank page with just the app's background colour, reload the page.
- Please be patient with the Meeting Functionality- it _may_ take a few attempts for a second user to join the call, in case the `STUN` server urls aren't connecting (or your region is experiencing network issues). I have done my best to avoid this, by testing the urls on `ICETrickle` to see their status.
- You need to be online with a good internet connection while using this app. Incase you run into problems with Firebase connections, a message will pop up.
