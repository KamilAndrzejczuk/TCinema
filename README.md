# TCinema
Project about creating seats reservation system for cinema using Node.js, Express.js, Angular, MongoDB

![alt text](https://raw.githubusercontent.com/KamilAndrzejczuk/TCinema/assets/assets/Main.png)
## Getting Started

### Project files

Clone the repository by typing into console
```
git clone https://github.com/KamilAndrzejczuk/TCinema.git
```
### Installing dependecies

Move to cloned repository directory in console and install all required dependencies by typing
```
npm install
```
## Running app
First, move to cloned repository directory. There are three steps to run the application, first you have to run mongodb instance by running ```mongod``` into your console and let it run in the background,
open new terminal tab and run ```nodemon``` into the main directory of the repository, then change directory to '/frontTCinema' and run ```ng serve```. That's it! You're ready to go.

## Routes

There are three basic routes
```
localhost:4200
localhost:4200/admin
localhost:4200/reservations
```

### Main page

Main page shows actual repertoire for chosen day, by default it's actual date. 

![alt text](https://raw.githubusercontent.com/KamilAndrzejczuk/TCinema/assets/assets/Seances.png)

After clicking on the chosen hour of seance, panel of available seats appears.
User picks the seats by clicking on them.

![alt text](https://raw.githubusercontent.com/KamilAndrzejczuk/TCinema/assets/assets/Screen.png)

In the last step user have to fill form of basic personal informations.
![alt text](https://raw.githubusercontent.com/KamilAndrzejczuk/TCinema/assets/assets/Form.png)


### Admin
Admin route direct to admin panel, where moderator can do operations like creating and deleting rooms, movies and seances,  
![alt text](https://raw.githubusercontent.com/KamilAndrzejczuk/TCinema/assets/assets/admin.png)

### Reservations

Reservation route shows simple input form where cinema employee have to enter person's phone number to check of any reservations have been done for.

![alt text](https://raw.githubusercontent.com/KamilAndrzejczuk/TCinema/assets/assets/reservation.png)


## Status

Project is about 50% done, there are things to do like:
- styling
- forms validation
- more admin panel functionalities
- adding carousel/slider with actual repertoire movies showing more details about it

