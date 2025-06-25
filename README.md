# IoTS-DataCollection

This application creates a simple webserver that accepts 3 requests:

* *POST*: accepts a message in plain text on the body containing one o more readings of the sensors in the following format "*number*,*number*,*number*;", where the numbers resresent respectively a temperature reading, TDS reading and PH reading, they should be separeted by commas and end with a semicollon. You can repeat this format as many times as you want in the same packet. The last semicollon is optional (only in the last reading).
* *GET*: Downloads a CSV document containing all the readings sent with the POST method.
* *DELETE*: Clear all the saved readings.

To execute this application we recomend the command "docker-compose up -d". Don't forget to install and setup docker in your machine beforehand, if you're using linux, you may need sudo permissions.

If you want to change the code and run with npm, you need to copy the document ".env.prod" into ".env" and set up the evironment variables to suit your needs, then run "npm i", "npm run build" and "npm run start:prod". To test the application: "npm i -D" and "npm start".