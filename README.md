# BookClubbin' frontend

### 🚀 Run the application in development mode 
- Run `npm run start` to start the app in the development mode
- Open http://localhost:3000 to view it in your browser

The page will reload when you make changes.
You may also see any lint errors in the console.

### 🧪 Test the application 
To run Cypress tests - you first have to do some **manual work** to simulate a logged in user. 
- Go to src/Routes/ProtectedRoute.js 
- Set the content of the if statement on line 14 to `true`. 
- Go to src/pages/home and do the same on line 29.

Now you can run the Cypress tests with the command `npm run cypress:open`

When you're done testing - **don't forget to change back to `false`**.
