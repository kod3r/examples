var five = require('johnny-five'), button, led;
var skynet = require('skynet');

var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "qos": 0
});

conn.on('ready', function(data){


  five.Board().on('ready', function(){
    led = new five.Led(13);

    console.log('Ready');

    conn.on('message', function(channel, databits){
      // if(data.fromUuid != "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc"){
        console.log(databits);
        data = JSON.parse(databits);
        if(data.red == 'on'){
          console.log("red on request received from skynet");
          led.on();
          // conn.message({
          //   "devices": "*",
          //   "message": {
          //     "red":"on"
          //   }
          // });

        } else if(data.red == 'off'){
          console.log("red off request received from skynet");
          led.off();
          // conn.message({
          //   "devices": "*",
          //   "message": {
          //     "red":"off"
          //   }
          // });

        } 

      // }

    });
    
  });

});
