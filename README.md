# Yelp Camp

Yelp camp is a dynamic web application which uses HTML, CSS, Bootstrap and JavaScript on the front-end and MongoDB on the backend. MongoDB is a non-relational database that stores information in the form of objects instead of tables. We use Express which is a node package to render dynamic data on static web pages.

### The functionalities that have been implemented in Yelp Camp are:

* User authentication so that a person can sign up, make an account, log in with the username and password and logout. 
* The user can create campgrounds, edit and delete the specific campgrounds they created. 
* The user can comment on all campgrounds, edit and delete his comments.
* The information is stored in the database that is hosted on the computer.

## Yelp Camp can be set up/installed with the following steps.

The following steps are common regardless of whether you have Linux/Windows/Mac OS

* Install node
* Install git
* Install npm

Clone the repository into your personal computer with:
 
```
git clone 
```
```
cd Yelp_Camp
```

We have to install the dependencies in the package-lock.json file so that the app works properly. This can be done with the following command:

```
npm install
```

package-lock keeps track of all the packages that are installed in the development of the app.

When all the above is installed properly, you can start the server with the following command:

```
node app.js
```
Once the server has started, you can open the following link and voila! There's your app!

For Windows,
```
 http://localhost:3000
```


For Linux,
```
 http://127.0.0.1:3000
```

## Acknowledgments

* This is a project from the course Web Developer Bootcamp on Udemy by Colt Steele
* Contributions and suggestions are welcome
