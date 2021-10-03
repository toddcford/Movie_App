This is an app that allows users to search for movies and view the names and images of the film's three leading actors/actresses. It searches the user's input in the IMDB database and uses the result to identify the three actors or actresses. It then uses Google Images's custom search API to fetch images of those three people and display them to the user.

In order to minimize the number of API requests and optimize performance, the app uses browser cacheing and a MongoDB database to store previously searched movies. When a user submits input, the program first checks if the data for the movie is available in the browser's cache. If not, it then checks to see if the data is stored in the MongoDB database. If the database has not yet stored the movie either, the program calls the IMDB and Google Image APIs. Upon receiving the data back, the program stores it in the database and cache, and displays the results to the user.

The app was written using Next, React, Node, Express, and Mongoose.


