function parseUplink(device, payload)
{
    var parsed = payload.asParsedObject();
    env.log(parsed);    

    // Store door state
    if(parsed.door_state != null){
        var door = device.endpoints.byAddress("1");

        if (door != null)
            door.updateGenericSensorStatus(parsed.door_state);
    };
   
    // Store trigger
    if(parsed.door_trigger_num != null){
        var trigger = device.endpoints.byAddress("2");

        if (trigger != null)
            trigger.updateGenericSensorStatus(parsed.door_trigger_num);
    };

    // Store humidity
    if(parsed.hum != null){
        var hum = device.endpoints.byAddress("3");

        if (hum != null)
            //El valor de humedad esta llegando como string en vez de número e incluye el caracter ASCII del símbolo de porcentaje
            // Entonces hay que eliminarlo, una forma es reemplazarlo por un string vacio.
            hum.updateHumiditySensorStatus(parsed.hum.replace('%', ''));
    };
     
    // Store motion
    if(parsed.pir_state != null){
        var pir = device.endpoints.byAddress("4");

        if (pir != null)
            pir.updateGenericSensorStatus(parsed.pir_state);
    };
    
    // Store temperature
    if(parsed.tem != null){
        var av2 = device.endpoints.byAddress("5");

        if (av2 != null)
            // El valor de temperatura viene como string en vez de número e incluye el caracter unicode del símbolo de grado
            // Una forma de eliminarlo es reemplazar cualquier caracter que no este comprendido entre 0 y 127 (ASCII)
            // que en la practica es reemplazar cualquier caracter NO ASCII por un espacio vacio.
            av2.updateTemperatureSensorStatus(parsed.tem.replace(/[^\x00-\x7F]/g,''));
            
    }

}


/*
{
        "door_state": 1,
        "door_trigger_num": 96,
        "hum": "64.8%",
        "hum_change_state": 2,
        "hum_ths_state": 2,
        "low_batt_state": 0,
        "packet_type": "dev_info",
        "pir_state": 1,
        "port": 6,
        "result": 0,
        "tem": "24.6°",
        "tem_change_state": 2,
        "tem_ths_state": 2,
        "timestamp": 1685640435,
        "timezone": "UTC+00:00"
      }
*\

function buildDownlink(device, endpoint, command, payload) 
{ 
	// This function allows you to convert a command from the platform 
	// into a payload to be sent to the device.
	// Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device to which the command will
	//   be sent. 
	// - endpoint: endpoint object representing the endpoint to which the 
	//   command will be sent. May be null if the command is to be sent to 
	//   the device, and not to an individual endpoint within the device.
	// - command: object containing the command that needs to be sent. More
	//   information at https://wiki.cloud.studio/page/1195.

	// This example is written assuming a device that contains a single endpoint, 
	// of type appliance, that can be turned on, off, and toggled. 
	// It is assumed that a single byte must be sent in the payload, 
	// which indicates the type of operation.

/*
	 payload.port = 25; 	 	 // This device receives commands on LoRaWAN port 25 
	 payload.buildResult = downlinkBuildResult.ok; 

	 switch (command.type) { 
	 	 case commandType.onOff: 
	 	 	 switch (command.onOff.type) { 
	 	 	 	 case onOffCommandType.turnOn: 
	 	 	 	 	 payload.setAsBytes([30]); 	 	 // Command ID 30 is "turn on" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.turnOff: 
	 	 	 	 	 payload.setAsBytes([31]); 	 	 // Command ID 31 is "turn off" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.toggle: 
	 	 	 	 	 payload.setAsBytes([32]); 	 	 // Command ID 32 is "toggle" 
	 	 	 	 	 break; 
	 	 	 	 default: 
	 	 	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	 break; 
	 	 	 } 
	 	 	 break; 
	 	 default: 
	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 break; 
	 }
*/

