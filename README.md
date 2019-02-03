# Address Book
Implementation of an address book in Nodejs. This project uses a RESTful API as documented
 Query | Description
---|---
GET /contact?pageSize={}&page={}&query={}| This endpoint will providing a listing of all contacts, you will need to allow for a defined pageSize (number of results allowed back), and the ability to offset by page number to get multiple pages. Query also should be a query for queryStringQuery as defined by Elasticsearch that you can pass directly in the Elasticsearch call.|
POST /contact|This endpoint should create the contact.  Given that name should be unique, this may need to be enforced manually.
GET /contact/{name}|This endpoint should return the contact by a unique name. This name should be specified by the person entering the data.  
PUT /contact/{name}|This endpoint should update the contact by a unique name (and should error if not found)
DELETE /contact/{name}|This endpoint should delete the contact by a unique name (and should error if not found)

To set up the project, after installing node and npm, in the root of the project directory run
>npm install

The back end of this application uses Elasticsearch, in the config file the host and port for Elasticsearch can be specified. Once set up, running
>node index.js

will start the server allowing http requests to be sent to {host:port} which will be set to the node environmental variables (default to localhost:3000)

Unit testing framework is through mocha. Simply running
>npm test

should run the unit tests automatically
***
I appretiate the time and effort being put into reviewing my work, and wanted to thank you for all of your time. Please pass my thanks along to any other relevant people as well.

Below is a detailed timeline of my work in timeslots along with the progress made in each timeslot

# 02/01/19
## 13:40 - 15:14 : 1hr 34min
* Began project
* Set up barebones RESTful server with express
* Created app structure
* Researched Elasticsearch(.js) and Mocha
### TODO
* Parse Query for<br>
```GET /contact?pageSize={}&page={}&query={}```<br>
properly
* Store data in Elasticsearch
* Unit Test
<br>

## 17:07 - 18:01 : 54min
* Parse Querey for<br>
```GET /contact?pageSize={}&page={}&query={}```<br>
done
* Unit Test writing started
### TODO
* Store data in Elasticsearch
* Unit Test

# 02/02/19 - 02/03/19
## 13:08 - 20:12 : ~4hrs
* Everything except running<br>
```GET /contact?pageSize={}&page={}&query={}```<br>
done
* Only Unit Test for this remains query, all others are passing
* Async unit testing is finicky(Just a comment, they are now working correctly)
* I wasn't working this entire time chunk, actual working time in this segment is closer to 4hrs

## 23:07 - 00:06 : 59min
* Finished everything
* Tidied up the README