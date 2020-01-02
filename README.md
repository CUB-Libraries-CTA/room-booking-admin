# Room Booking Admin

This project providing an admin console to room booking project.
The admin of this project can delete, edit, activate the devices in room booking project.

## Installing
```
git clone git@github.com:culibraries/room-booking-admin.git room-booking-admin

cd room-booking-admin

npm install

#run at localhost:4200
ng serve -o
```


## Build
PROD:
```
docker build --build-arg app=room-booking-admin -t culibraries/room-booking-admin:[version]
```
TESTING:
```
docker build --build-arg app=room-booking-admin -t culibraries/room-booking-admin:testing-[version]
```
Push to DockerHub:
```
docker push culibraries/room-booking-admin:[version]
```

## License

Libraries IT - University Of Colorado - Boulder
