<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Shopify Webhook Receiver
## Description
- This project uses [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- This is a simple project demonstrating how to receive webhooks from Shopify and process them. 
- NB: The project is limited to receiving only two types of webhooks: `orders/create` and `orders/fulfilled`. It can further be extended to receive other types of webhooks.

## Tooling
- [Ngrok](https://ngrok.com/) - This is used to expose the local server to the internet. This is necessary for Shopify to be able to send webhooks to the local server. (Please set up an account and download the tool to run the app locally)
- [Prisma](https://www.prisma.io/) - This is a server-side library that helps in reading and writing data to the database in an intuitive, efficient and safe way.
- [PostgreSQL](https://www.postgresql.org/) - This is the database used for this project. It is a relational database that is free and open-source.
- [Docker](https://www.docker.com/) - This is a tool that is used to containerize the application. It is used to run the application in a containerized environment.
- [Husky](https://typicode.github.io/husky/) - This is a tool that is used to run scripts before git commands are executed. It is used to run linting and formatting scripts before commits are made.
- [Mailgun](https://www.mailgun.com/) - This is a tool that is used to send emails. It is used to send emails to customers when their orders are fulfilled.
- [Shopify](https://www.shopify.com/) - This is an e-commerce platform that is used to create online stores. It is used to create a store and send webhooks to the application.


## Installation
```bash
$ yarn install
```

## Running the app

```bash
# starting the docker container (inside the project's root directory)
$ docker-compose up 

# watch mode
$ yarn start:dev

# start ngrok (in a separate terminal)
$ ngrok http 3000
```
## Next Steps
- Duplicate the `.env.example` file and rename it to `.env`. Then fill in the required environment variables.
- Create a store on Shopify. (PS: you can follow these guides [here](https://hookdeck.com/webhooks/platforms/how-create-shopify-webhooks-with-shopify-api-tutorial#creating-a-shopify-store-app) and [here](https://hookdeck.com/webhooks/platforms/how-create-shopify-webhooks-with-shopify-admin-dashboard-tutorial#viewing-the-webhook-logs))
- Set up a webhook for `orders/create` and `orders/fulfilled` events. (PS: The webhook URL should be the ngrok URL which can be found in the terminal after running the `ngrok http 3000` command.) Examples:
  - Copy the https url from the Forwarding session status. (e.g. https://ccc-154-160-7-65.ngrok-free.app)
  - Webhook URL: *https://ccc-154-160-7-65.ngrok-free.app/orders/create* and *https://ccc-154-160-7-65.ngrok-free.app/orders/fulfilled*
- Place an order on the store and check the terminal to see the logs. You can also see the logs on the ngrok dashboard web interface (url is usually http://localhost:4040/inspect/http and can be found in the terminal)

## A few things to note
- Currently not verifying the webhooks with HMAC Signature.
- Only two types of webhooks are being received: `orders/create` and `orders/fulfilled`. This can be extended to receive other types of webhooks.
- Things like rate limiting, caching, etc. have not been implemented as this is merely a tiny project.
## Test
I didn't write e2e tests. I have however written unit tests for the most important parts of the application.
```bash
# unit tests
$ yarn run test

# test coverage (Test coverage )
$ yarn run test:cov
```


## Project Structure
```bash
├── prisma
│   └── migrations
├── src
│   ├── __tests__
│   ├── mailer
│   ├── orders
│   │   ├── __tests__
│   │   ├── dto
│   │   │   └── __test__
│   │   └── fixtures
│   └── prisma
│       └── __tests__
└── test
```
