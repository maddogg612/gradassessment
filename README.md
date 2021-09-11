# Graduation Assessment


## Summary
You will be building a message board where users can post and view messages. This application will include the ability to:

- view all posted messages from the database
- post a new message to the database
- delete messages in the database if authenticated


## Important Notes for Us to Test Your Application
You are not given any code to test your application, but we will run tests on your Pull Request. In order for these tests to run properly, please adhere to the following:

- While you are free to add any additional files you want, **do not edit the file structure or delete existing files**
- Likewise you can add additional HTML elements, IDs, and classes, but **do not remove existing hardcoded HTML elements/attributes**
- If you are told to send or display a certain string or to name a file or function a certain name, copy-paste the string **exactly** as it is shown. Alternate text or differing capitalization will fail the tests.
- Run your server and test out your application before submitting! Even if things are not working 100% correctly, you should be able to catch and remove any syntax or reference errors just by running your application
- You are free to edit the stylesheet as you please!



## Serving the files
For this part you will be editing the `server/server.js` file.
- [ ] Create a Node.js HTTP server that listens on port **3434**. (You may use Express if you'd like, but it is not necessary.)
- [ ] When you visit `http://localhost:3434/` in the browser, it should serve the `index.html` file from the `views` folder. This is the message board.
- [ ] You should also serve the CSS and JS that the html files are requesting. These are located in the `assets` folder. Make sure the `Content-Type` header is getting properly set in the HTTP response. (Some methods from some frameworks infer the content type from the file extension and set the header automatically.)



## Message Database
Your message board application would be useless without a database to hold onto the messages between sessions.

#### Message Model
In the `server/models/MessageModel.js` file, implement a database in either MongoDB or PostgresQL (Mongoose/Sequelize optional) as follows:
- [ ] We want to store our data in a collection/table called `Message`. (Remember, this may be created as the plural `Messages` - that is fine.)
- [ ] All items in the database **must** have a property `message` which is a string
- [ ] All items **must** also have a property `password` which is a string
- [ ] Additionally, all items should be stored with the time they were `created_at`. This should default to now

#### Message controller
In the `server/models/messageController.js` file, add the following functionality to the exported controller. (These will be server middleware/final handler functions, so they should take the appropriate parameters and perform the necessary callback operations.):
- [ ] Function `postMessage` should create a new item in the database
- [ ] Function `getMessages` should retrieve all items from the database and send it back to the client as JSON
- [ ] Function `deleteMessage` should find items in the database based on an ID number and delete the `message` if it exists. (Later, you will be asked to authenticate before deleting the message.)



## Client-side JavaScript/DOM Manipulation
You are serving `index.js` to the client for use on the page, but there is not much existing functionality. Add code to achieve the following:

- [ ] After the page has initially loaded, all messages from the database should be displayed as list items in the `#message-list` element. These list items should display the message item followed by a `button` (inside the list item) with a class of `del` and display the word `Delete`. As an example, one list item might look like
`<li>This is a great message!<button class="del">Delete</button></li>`
- [ ] The application should poll for new messages from the database every two seconds and display them. Messages should not display in the list multiple times
- [ ] Clicking on the button to add a message should take the text from the text area and the password input field to create a new message in the database. If either field is empty, the message should not be sent to the server. (Validate on the frontend.) This message should be appear on the next poll. (Optionally, you can display the new message immediately after adding.)
- [ ] Clicking on any list item's `Delete` button should remove the item from the database. (Later, you will authenticate before deleting.) The message should be deleted from the DOM on the next poll. (Optionally, you may remove it immediately after it is deleted from the database.)



## Server Routing
By now, your server should serve the static assets and the index page. Add additional routes to achieve the following functionality (if you haven't done so already):
- [ ] Create the routes to tie the client-side JavaScript events to the appropriate database functions



## Authentication
Modify your code to enforce the following authentication measures. (Use the `server/controllers/authController.js` file to add any middleware functions):
- [ ] Upon successful posting of a new message with a password, the server should set a cookie on the client with a key of `pass` and a value of the provided password in plaintext. (Obviously, this should never be done in real applications.) Additional posts with different passwords will overwrite the value of the cookie on the client.
- [ ] Whenever a user tries to delete a message, the server should check if the cookie contains a `pass` that matches the password stored with the given message before allowing the message to be deleted. If the password does not match or is not provided in the cookie, nothing should happen.
