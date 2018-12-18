# TCinema
Project about creating seats reservation system for cinema using Node.js, Express.js, Angular, MongoDB

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
open new terminal tab and run ```nodemon``` into the main directory of the repository, then change directory to '/frontTCinema' and run ```ng serve```. That's it! You 're ready to go.

## Routes

There are three basic routes
```
localhost:4200
localhost:4200/admin
localhost:4200/reservations
```

### Main page

Main page shows actual repertoire for chosen day, by default it's actual date. 

!!!IMG!!!
After clicking on the chosen hour of seance, panel of available seats appears.
!!!IMG!!!
User picks the seats by clicking on them.
!!!IMG!!!
In the last step user have to fill form of basic personal informations.

### Admin
Admin route direct to admin panel, where moderator can do operations like creating and deleting rooms, movies and seances,  
!!!IMG!!!
### Reservations

Reservation route shows simple input form where cinema employee have to enter person's phone number to check of any reservations have been done for it.

!!!IMG!!!

## Status