# smart-brain-api
ExpressJS server API for smart brain

# To install the packages:
```
npm install
```

# To start the server run:
```
npm start
```

## With regards to docker for the api, the envrionment variables `POSTGRES_URI` can be set as follows

```
POSTGRES_URI: postgres://<user>:<password>@<host>:<port>/<database-name>
```

Note volumes are mounted after dockerignore therefore the `.dockerignore` file is overwritten