# BookClubbin'

### Test the application
To run Cypress tests - you first have to do some manual work to simulate a logged in user. 

Go to src/Routes/ProtectedRoute.js and set the content of the if statement on line 14 to `true`. Then go to src/pages/home and do the same on line 29.

Now you can run the Cypress tests with the command `npm run cypress:open`

When you're done testing - don't forget to change back to `false`.