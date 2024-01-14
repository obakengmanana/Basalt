# root

## Node JS Folder
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
node server.js
```

# public

## Vue JS Folder
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Description

Functions of the applications

1. Gets a list of all timezones and populates them in the database (MongoDB).
2. On the main application page, we will have a dropdown having all collectd timezones.

3. Upon selecting a timezone, what will appear is the time and date associated with that timezone.
4. Above the time and date there is weather represented in degree celcious, we make use of the same timezone to determine the weather.
5. Weather apprearing is from an api with the following url "https://rapidapi.com/MeteosourceWeather/api/ai-weather-by-meteosource", N.B for some timezones we will get an error for those we can't find the weather for.

6. Below all the above mentioned sections, we have news from an api with url "https://rapidapi.com/rphrp1985/api/google-api31", we also make use of timezone to search the nea that may contain words that are on the timezone, N.B please note for some news articles we may have a corrupt or image link that is not active and such will result in a picture not being displayed for that specific article.

7. server.js contains all the endpoints we make use of.
