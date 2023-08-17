<!-- PROJECT LOGO -->
<br />
<div align="center">
    <a>
    <img src="https://www.mangoitsolutions.com/wp-content/uploads/2022/01/becomeamernstackdeveloper-mobile-300x279.png" alt="Logo" width="400" height="400">
    </a>
</div>

# BRACU Knowledge Nexus

Welcome to the BRACU Knowledge Nexus project! This is a web-based platform that provides users with the ability to share resources, as well as engage in conversations with fellow users. It also includes user account management functionalities, such as user registration, login, profile update, along with features like post creation, upvoting and downvoting mechanisms, discussion threads, and search functionality.

The project is developed using MERN Stack and is designed to be user-friendly, intuitive, and efficient. This project is aimed at improving user experience and making it easy for users to share and discuss topics in a secure and reliable manner. A [MaterialUI](https://react.school/material-ui/templates "https://react.school/material-ui/templates") template is used for the frontend design of this project.

This project is still under development. Therefore, some features might still not be functional and bugs are expected. Feel free to browse the codes. Thank You!

## Demo

>Website Link : [Live Preview](https://knowledge-nexus-lime.vercel.app/ "https://knowledge-nexus-lime.vercel.app/")

### Note: The frontend of the website is hosted on Vercel and the backend is hosted on Render for free. Please be aware that occasional downtimes might occur with the backend of this website. The backend is hosted on Render, which auto shuts down the server due to inactivity. it may take some time to initially relay the response to the frontend.


# Project-Installation-Guide
**To run the development server locally, follow the steps:**
- Create a `.env` file at `server/`
- Add the following details correctly,
```
PORT = portNumber
DB_CONNECT = YourMongodbURI
PASS_SEC = YourSecret
JWT_SEC = YourSecret
```
- Run `npm i` at both `server/` and `client/` folders. **[Note: You may need to run it with the --force flag]**
- Run `npm start` to start the project in both `server/` and `client/` folder.

## Features

1) **Resource  Sharing:** Users can create and share posts on various topics.

2) **Upvoting and Downvoting:** Users can upvote or downvote notes shared by other users.

3) **Discussion Threads:** Users can start discussion threads on various posts and engage in meaningful conversations with other users.

4) **Search Functionality**: Users can search for notes, discussion threads, and other content using a search bar.

5) **User Profile**: Users have their own profiles where they can view their information, posts, favorites.

> ***Note: Some functions are still under development. More functions will be implemented over time.***


## Built With

![My Skills](https://skillicons.dev/icons?i=mongodb,express,react,nodejs,redux,materialui&theme=dark)


