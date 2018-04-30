# cogiv

cogiv is a social media platform that gives service non profit organizations exposure to new audiences. It creates an environment where nonprofit giving is a more collective, rewarding experience for donors. With cogiv, users will be able to discover nonprofits working toward causes that they care about, subscribe to make monthly donations to the charities they feel passionate about, and receive meaningful feedback about their own impact over time as well as the collective impact of the community of fellow cogivers. cogiv amplifies the impact of micro-donating on a collective level and makes its consequences felt.

## Built With:
- AngularJS / Angular Material
- Express.js
- Node.js
- PostgreSQL
- Stripe.js
- Passport-facebook
- Node-postgres

## Getting Started:

### Prerequisites:

To get cogiv running on your machine locally, you will need:

- <a href="https://nodejs.org">Node.js</a>
- <a href="https://www.postgresql.org/">Postgres</a>
- <a href="https://eggerapps.at/postico/">Postico</a>
- A Filestack <a href="https://dev.filestack.com/signup/free/">API key</a>
- A Facebook Developer <a href="https://developers.facebook.com/tools/accesstoken/">access token</a>
- To create a Stripe <a href="https://stripe.com/get-started?&utm_campaign=paid_brand&utm_medium=cpc&utm_source=google&ad_content=261743943756&utm_term=stripee&utm_matchtype=b&utm_adposition1t1&utm_device=c&gclid=Cj0KCQjw_ZrXBRDXARIsAA8KauQz9pTbsqF2Eeos9HMBJ2Jpi2pdT81U_SgxpSzFC5BPHql5fJ_00LUaAvYSEALw_wcB">account</a> and get access keys.


### Installing:
- Download the Zip
- ```npm install```


You will need to create a .env file in the project root. There you will need to store the following:

```
STRIPE_SECRET_KEY=‘<YOUR_KEY_HERE>’
FACEBOOK_APP_SECRET='<YOUR_KEY_HERE>'
FACEBOOK_APP_ID='<YOUR_KEY_HERE>'
SERVER_SESSION_SECRET='<YOUR_KEY_HERE>'
FILESTACK_KEY='<YOUR_KEY_HERE>'
DEV=‘true’
DEPLOY_REDIRECT_URL=’https://cogiv.herokuapp.com/auth/facebook/callback'
LOCALHOST_REDIRECT_URL=‘https://localhost:4430/auth/facebook/callback’
```

The DEV variable in the .env file toggles between local development and online deployment.  If DEV is set to 'true' (it's a string, not boolean) the code defaults to creating a SSL certificate locally (which is needed for facebook OAuth to work on a localhost).  When the code is deployed change the DEV variable to 'false' (again, use a string), and the code will default back to regular behavior.

You will also need to create a database:

In Postico, create a "New Favorite" with "Host" set to ``localhost`` and "Port" set to ``5432``. Then create a new "Database" named ``co_giv``. Next, copy and paste the contents of the ``database.sql`` file into the SQL Query window.  Admin users will have to have their role changed by the DB admin from a 2 to a 1.  The default for new users is a role of 2.


You will need to create and register a new application with Facebook.
- Go to <a href="https://developers.facebook.com">Facebook for Developers</a> and log in.
- From the 'My Apps' menu on the top right select 'add a new app'.
- Enter the information when prompted, and click 'Create App Id'.
- After that In the 'Facebook Login' box select 'Set Up'.
- Select 'Web'.
- Enter the sites Url and click continue.
- Hit 'Next' through the next 3 pages.
- Copy the App Id and paste it into your .env file.
- Select the main settings, then 'basic'. Click 'show secret', then copy and paste that into your .env file.

You will need to provide Facebook with a Valid OAuth Redirect URI:
- for local development use 'https://localhost:4430/auth/facebook/callback'.
- for deployment replace 'localhost:4430' with the site domain.

You will need to provide Facebook with the domain of the site, do this in the basic settings, for local development use 'localhost:4430' for deployment use the site domain.
Also, in the basic settings provide the site URL, again for local development use 'localhost:4430' and for deployment use the app domain.

After all that you are ready to start the app:
- ```npm start```


We used the Stripe API to handle the creation of customers, products, subscriptions, and charges within our code.  For a comprehensive rundown of the Stripe API and its capabilities, see Stripe's superb <a href="https://stripe.com/docs/api/">API documentation</a>.  In addition the API, Stripe offers a powerful and intuitive <a href="https://dashboard.stripe.com/test/dashboard">Dashboard</a> tool.  For a guide of Stripe's Dashboard and API features, checkout Stripe's <a href="https://stripe.com/docs/quickstart">Quickstart</a> guide.

==========================================================================================
Below are the directions for deploying to heroku:



### Heroku Prerequisite

1. Sign up for an account on [Heroku.com](https://www.heroku.com/)
2. Install Heroku CLI by typing `brew install heroku` in Terminal
3. Authenticate by typing `heroku login` in Terminal

  > Note: Your project also needs to have a git repository.

### Heroku Setup

Run the following commands from within your project folder.

1. In terminal, navigate to your project folder and type `heroku create`
2. Login in if prompted
3. Type `git remote -v` to ensure it added successfully
4. In terminal, type `git push heroku master`
5. Our website is now live! However... we also have a database

### Postgresql on Heroku

1. In terminal, type `heroku addons:create heroku-postgresql:hobby-dev` to set up Postgresql on your Heroku project
2. Next, type `heroku pg:push gacrux-todo DATABASE_URL` to copy your co_giv database contents up to Heroku. **DATABASE\_URL is a heroku config variable created by the Add On. Do not replace it with something else, just type: DATABASE\_URL**

If you want access to your Postgres Database you will need to get the credentials from Heroku:

From the Overview Tab:
- select 'Heroku Postgres' from the add-ons
- select 'settings'
- select 'View Credentials'
-Copy the needed credentials into your Postico (or whichever DB software you choose)


Next, commit your changes and push them to Heroku:

```
git add .
git commit -m "MESSAGE"
git push heroku master
```

Next you will need to take all of the variables from your .env file and input them into the heroku dashboard for your application.
From the dashboard navigate to the 'Settings' tab and click 'Reveal Config Vars'.  In there should already be the DATABASE_URL from importing your database.  Add all of the CONFIG VARS. You will need to make the following change, set DEV to equal 'false'.

Lastly, open terminal and type `heroku open`

### Miscellaneous

- `heroku logs` - Display error logs
- `heroku config` - Show basic app info
- `heroku restart` - Sometimes it helps to turn things off an on again
- `heroku open` - Opens the website for you project in the browser
- `git remote -v` - Shows your remotes

## Resources

More detailed instructions can be found here:

- [https://devcenter.heroku.com/articles/git](https://devcenter.heroku.com/articles/git)
- [https://devcenter.heroku.com/articles/heroku-postgresql](https://devcenter.heroku.com/articles/heroku-postgresql)
