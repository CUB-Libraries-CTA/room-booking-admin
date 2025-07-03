⚠️ This repository is archived and is no longer maintained or in use. It remains available for reference only.

# Room Booking Admin

This project providing an admin console to room booking project.
The admin of this project can add, delete, edit the devices in room booking project.

## Installing
```
git clone git@github.com:culibraries/room-booking-admin.git room-booking-admin

cd room-booking-admin

npm install

#run at localhost:4200
ng serve -o
```


## Build
PRODUCTION:
```
docker build --build-arg ENV=production -t culibraries/room-booking-admin:[version]
```
TESTING:
```
docker build --build-arg ENV=staging -t culibraries/room-booking-admin:[version]-staging
```
Push to DockerHub:
```
docker push culibraries/room-booking-admin:[version]
```

## License

Libraries IT - University Of Colorado - Boulder
