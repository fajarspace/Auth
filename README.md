## Testing

get all data

- GET http://localhost:5000/users

get single user

- GET http://localhost:5000/users/2b27b128-3525-420a-ae13-35814857c6a1

create user

- POST http://localhost:5000/users
```
{
    "name": "agung",
    "email": "agung@gmail.com",
    "password": "123456",
    "confPassword": "123456",
    "role": "user"
}
```

update user

- PATCH  http://localhost:5000/users/f8ef9bcb-e186-4c03-a889-d8a7efd443dd
```
{
    "name": "agung akwokaw",
    "email": "agung@gmail.com",
    "password": "123456",
    "confPassword": "123456",
    "role": "user"
}
```

delete user

- DELETE http://localhost:5000/users/f8ef9bcb-e186-4c03-a889-d8a7efd443dd