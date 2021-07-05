# Auth system with Node Express Mongo and PassportJS

To run the repository,

1. Clone the repository with `git clone git@github.com:RtjShreyD/Node-Passport-Auth.git`.

2. Run command `cd Node-Passport-Auth/`.

3. Create a MongoDB cloud Instance by logging on https://cloud.mongodb.com/

4. Grab the url to the cloud instance, it looks somewhat like the following,
"mongodb+srv://<username>:<password>@cluster0.pcmxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'"

5. Go to `config/keys.js` and replace the MongoURI string with thee URL of the current Mongo cloud instance.

6. Run `npm i`.

7. Run `npm start dev`, server will be listening on localhost:5000, checkout from browser.