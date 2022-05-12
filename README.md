## Task
Your task is to implement a UI for the given jobs data:
1. Rendering the list of jobs as individual cards showing the most important information (Title, Company, City, Investors)
1. A search interface at the top that will filter down the list with the following elements:
   1. Search box for Job Title
   1. Filter for Company
   1. Filter for City
   1. *Filter by Investors (only jobs from companies with these investors)
1. A reset button that removes any applied filters

(Tasks items with **"*" are optional**)

We’re not giving you any restrictions in how it should look. You can take inspiration from existing job platforms or just implement your own design&layout. The focus is on the search element + list view, no need to implement a complex page layout.

You’re also free to use any framework and styling library that you prefer. Just FYI our stack at Talentspace ist Ant Design with styled-components.

## Overview

This project uses a `docker-compose` file to bundle the React app with a Postgres database and [Hasura GraphQL Engine](https://hasura.io/).
Upon start the database will be initialized with tables `jobs`, `companies`, `investors` and `company_investors` and seeded with data.

## How to run the project

There are two ways how to run the project:

1.) Using only the docker-compose file: 
- `docker-compose up --build`
- This will start the React app on port 8000 and Hasura on port 8080


2.) Running a local version of the React app alongside the docker container 
- `docker-compose up -d --build`
- `yarn install`
- `yarn start`
- This will start the local React app on port 3000 and Hasura on port 8080

## Description of commands

### `docker-compose up -d --build`

Builds and starts the containers for the React app, Postgres database and Hasura Console alongside each other.
It can take a few seconds after the containers have started until the Database is fully initialized and seeded.
* Open [http://localhost:8000](http://localhost:8000) for the **React app**
* Open [http://localhost:8080](http://localhost:8080) for the **Hasura Console**

### `yarn start`

Runs the app in the local development mode. If you prefer this to the dockerized React app. <br />
Open [http://localhost:3000](http://localhost:3000) to view the **React app**

You **still have to run the docker containers** at the same time, to make the Database + Hasura Console available.

## Executing commands in the React container (e.g. for adding packages)
If you want to add a new package, you can do this in the project. But it won't automatically be available in the React container without rebuilding.

To make an added package available without rebuilding you can run yarn install directly in the container:

`docker exec -it coding-challenge yarn install`

## About Hasura GraphQL Engine

Hasura GraphQL Engine is a blazing-fast GraphQL server that gives you **instant, realtime GraphQL APIs over Postgres**, with [**webhook triggers**](event-triggers.md) on database events, and [**remote schemas**](remote-schemas.md) for business logic.

Hasura helps you build GraphQL apps backed by Postgres or incrementally move to GraphQL for existing applications using Postgres.

Read more at [hasura.io](https://hasura.io) and the [docs](https://hasura.io/docs).


