[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Ao5UvMzV)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17282669)
# Practical Activity #5 
# REST API with MongoDB

## Assignment:
Implement a REST API with MongoDB

### Objectives
* Implement a RESTful API for managing student records using MongoDB as the database. 
* Know how to use the mongodb driver
* Know how to use the mongoose ODM
* Know how to deploy on Render + Atlas.

You will be provided with a base code that uses a lowdb database and starter code for mongodb and mongoose implementations.

#### Objective A
Implement the RESTful API using the mongodb node.js driver to interact with MongoDB

* use `appmongodb.js` as base code
Implement CRUD Operations: Implement routes to perform CRUD operations using mongodb with MongoDB.

#### Objective B
Implement the RESTful API using the mongoose ODM to interact with MongoDB

* use `appmongoose.js` as base code
Implement CRUD Operations: Implement routes to perform CRUD operations using mongoose with MongoDB.

#### Objective C
Migrate / recreate your MongoDB at a cloud like [Atlas cluster](https://www.mongodb.com/pt-br/cloud/atlas/register)

Deploy one of the versions of the Restful API at Render.com + Atlas


### Base Code
You are provided with the following code that uses lowdb for database operations. Your task is to build two new versions of the server side scripts.
* `applowdb.js` RESTAPI using lowdb for reference

You are provided with the front-end code, that **should not be modified**, and **should work with all the implementations**.

* `public/script.js`client side javascript to communicate with the server and dinamically update the frontend (displays data as a table).
* `public/index.html`client side skeleton html.
* `public/styles.css`client side styles.

## SETUP Local

### Setup MongoDB locally

Install MongoDB and create a database named **studentsdb**. Inside this database, create a collection named **students**.

Deploy mongod DBMS locally

### Install Dependencies 
Install the necessary npm packages:

* hint : run `npm install`

## SETUP Render + Atlas
### Integrate MongoDB@Atlas with Render.com

Start reading [this documentation](https://www.mongodb.com/docs/atlas/reference/partner-integrations/render/) and also [this documentation](https://docs.render.com/connect-to-mongodb-atlas)

Alternatively you can read [this](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-set-up-mongodb-atlas) and [this](https://coding-boot-camp.github.io/full-stack/mongodb/deploy-with-render-and-mongodb-atlas)

**== important notice ==**

To connect a Render-hosted application to an Atlas cluster, you must select AWS as the cloud provider for your Atlas cluster.

**== checklist ==**

@Atlas
* signup for a Atlas account
* create a cluster
* create a database (studentsdb)
* create a collection (students)
* populate with some document (just to test)
* define username(s) / password(s) to access database
* Add (whitelist) IPs from where you are going to access the database (check @render)
* get the connection string

@github @Render
* you must have the install and deploy scripts
* store critical info at proper environment variables
* add the connection string to your code
* deploy from github

## Hints
Test your API using tools like Postman or curl.

## Submission
Submit @moodle the URL of the deployed project @render.com and the URL of your repository @github.

### due date
** 3 december 2024 **

Ensure your code is well-documented and follows best practices.

##### Good work!

----
(c) 2024 pedromoreira estgipvc 