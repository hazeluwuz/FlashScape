# FlashScape! ( A clone of BrainScape )
FlashScape is a simple clone of the Flashcard app "BrainScape". The app currently features the ability for users to create classes, as well as unique decks and cards for each class.

## This project was developed utilizing:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)&nbsp;
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)&nbsp;
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)&nbsp;
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)&nbsp;

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)&nbsp;
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)&nbsp;
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)&nbsp;
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)&nbsp;
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-100000?style=for-the-badge&logo=sql&logoColor=BA1212&labelColor=AD0000&color=A90000)&nbsp;

##  Live Site
* [FlashScape](https://flashscape.herokuapp.com/)

## Wiki Links:

* [Database Schema](https://github.com/hazeluwuz/FlashScape/wiki/DB-Schema)
* [User Stories](https://github.com/hazeluwuz/FlashScape/wiki/User-Stories)
* [API Routes](https://github.com/hazeluwuz/FlashScape/wiki/API-Routes)
* [Redux State Shape](https://github.com/hazeluwuz/FlashScape/wiki/Redux-State-Shape)
* [App Features](https://github.com/hazeluwuz/FlashScape/wiki/App-Features)
* [Wireframes](https://github.com/hazeluwuz/FlashScape/wiki/Wireframes)
***

## How to run FlashScape Locally:
* Clone the repository in your terminal: ```git clone https://github.com/hazeluwuz/FlashScape.git```
* cd into FlashScape folder and run ```pipenv install```
* Open two terminal paths for both FlashScape and react-app.
* Under FlashScape run ```pipenv shell``` then ```flask run```, for react-app run ```npm install```
* Create a ```.env``` file under the root of the backend folder with the following contents:
```
REACT_APP_BASE_URL=http://localhost:5000
```
* In the terminal under FlashScape, migrate and seed files as follows:
```
flask db upgrade
flask seed all
```
* Now, run ```flask run``` under FlashScape and ```npm start``` under react-app

### Your local host should be running with full functionality now!

## Site Screenshots

### Splash Page
![image](https://user-images.githubusercontent.com/28935811/194788220-cbcd9db1-5ec5-479d-882d-36fb8d5eda7d.png)

### User Dashboard
![image](https://user-images.githubusercontent.com/28935811/194788232-6de19f93-1668-4aa3-8e43-d16539f57fe6.png)

### Study Cards
![image](https://user-images.githubusercontent.com/28935811/194788246-eb808e0b-4c81-4cd2-b6ae-71e0b58bab2a.png)

### Edit Cards
![image](https://user-images.githubusercontent.com/28935811/194788255-9c60a45c-9673-44da-ad4b-e75a6dc2c9e7.png)


***
