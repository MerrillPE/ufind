# UFind

## Repository Structure

Each service has its own folder as follows:
- `client` -> Frontend utilizing ReactJS
- `auth` -> Authentication service for login and account registration
- `forum` -> Forum service for handling posts and comments
- `chat` -> Chat service for direct message chats between users

## Repository and Branch Management

So that we don't accidently overwrite other people's changes and to make it easier to track down bugs, please create and checkout your own branch of the repository for your work. When the changes you have made are ready for others to implement in their own branches, you will merge your branch with the main branch.

You can check what branch you have checked out with: `git status`

To create and checkout a branch, run the following commands (replacing {name}) after cloning the repository:
1. `git branch {name}` (this will create the branch on your local machine)
2. `git checkout {name}` 
3. After making any changes, run `git add .` in the project directory
4. `git commit -m '{info on changes}'`
5. `git push origin {name}`

When ready to merge, make sure all changes are commited and pushed to your branch then run the following:
1. `git checkout main`
2. `git pull origin main` (this makes sure your local main branch is updated with any changes others have merged)
3. `git merge {name}` 
4. If there are no merge conflicts, run `git push origin main`
5. `git checkout {name}` before making any additional changes

To make sure any changes to main are implemented in your branch, run:
1. `git pull origin main`
2. `git checkout {name}`
3. `git rebase main`


## Development Environment

Please use Node Version Manager (NVM) for managing your node installation to ensure everyone is on the same version (v18.13.0):
1. Follow instructions at https://github.com/nvm-sh/nvm to install NVM
2. Once NVM is installed, run `nvm install 18.13.0` (this is the lts version at time of initial commit)
3. Run `nvm use 18.13.0`
4. Check node version with `node --version`, it should return v18.13.0

VS Code is recommended to use as your code editor with the following extensions:
- Javascript ES6 Code Snippets: https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets
- React ES7+ Code Snippets: https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets
- Simple React Snippets (will make your life easier when using hooks and arrow functions): https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets
- Prettier (will auto format code to be more readable on save): https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode 

### REMINDER: Please ensure that you have your own branch checked out before pushing commits to Github

At time of inital commit, each backend service (`auth`, `chat`, and `forum`) has the following packages as dependencies:
- `nodemon` (this will allow you to not have to restart the server manually everytime a change is made)
- `express` (for building the API)
- `cors`
- `body-parser`
- `mongoose` (for interfacing with MongoDB)
- `bcrypt` and `bcryptjs` (for handling password hashing, probably only really needed for `auth`)
- `dotenv`
- `jsonwebtoken`

The client service has a lot of dependencies and more will probably need to be added. A key dependency is Material-UI (MUI) which will help with the styling of frontend components, please look through the documentation here: https://mui.com/material-ui/getting-started/overview/

To install these packages in your own environment, you only need to navigate to each service's directory in terminal and run `npm install` (this is because they already exist as dependencies in the `package.json` file). For example, if you are working on the `forum` service you would enter the following terminal commands while in the project folder:
1. `cd ./forum`
2. `npm install`
