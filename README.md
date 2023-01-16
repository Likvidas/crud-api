# CRUD API

## Quick start

1. Clone this repo using:

```shell
$ git clone https://github.com/Likvidas/crud-api.git
```

2. To install:

```shell
$ npm install
```

3. Start project in Development mode

```shell
$ npm run start:dev
```

4. Start project in Production mode

```shell
$ npm run start:prod
```

5. Start project in Multiply mode (with cluster)

```shell
$ npm run start:multi
```

### Important

To set the `PORT` on which the application will start, you need to use the `.env` file. By default, `PORT: 6060` is used.

### Endpoints:

- GET `api/users` is used to get all persons.

- GET `api/users/{userId}` is used to get user by id.

- POST `api/users` is used to create record about new user and store it in database.

- PUT `api/users/{userId}` is used to update existing user.

- DELETE `api/users/{userId}` is used to delete existing user from database.

#### NOTE

To create a new user, you can use this example for the request body:

```shell
{
  "username": "Anna"
  "age": "22",
  "hobbies": ["fashion", "IT"],
}
```
