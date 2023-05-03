import RNBluetoothClassic, {
  BluetoothDevice, BluetoothEventType
} from 'react-native-bluetooth-classic';
import { PermissionsAndroid } from 'react-native';

const requestConnect = async () => {

  //permissions = [ PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN ];
  const granted = await PermissionsAndroid.requestMultiple(
    [ PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN ],
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};



export async function bluetoothTest(scannerNum)
  {


    var pit;
    var tagaddress;

    // INPUT NEW SCANNER NUMBERS BELOW!
    if (scannerNum == 1){
      tagaddress = "0"
    }
    else if(scannerNum == 2){
      tagaddress = "00:04:3E:6F:46:37"
    }
    else if(scannerNum == 3){
      tagaddress = "0"
    }
    else if(scannerNum == 4){
      tagaddress = "0"
    }



        /*
    connectTo : trys to connect to the tag scanner in the background
    parameters : tag scanner mac adress
    return: console logs on the success of connection
    errors: errors can result from tag scanner not being turned on, or distance from
    bluetooth device. 
    */
    const connectTo = async (address)=>{
      try{
        // var tagaddress = "00:04:3E:6F:46:37"

        
        console.log("HELLO");

        // check if device is off
        try {
          const device = await RNBluetoothClassic.getConnectedDevice(address);
          
      } catch (err) {
        return undefined;
      }

        // connect if on
        await RNBluetoothClassic.connectToDevice(address);
        console.log('Connected to device');

        console.log("HELLOTWO");
        
        pit = await read(address);

        


        return pit;

      } catch(error){
        //console.log("error" + error);
      }

    };

    var isEnabled = false; 

    /*
    enable : prompts the user to enable bluetooth 
    void: changes isEnabled boolean depending on user selection
    */
    const enable = async(tagaddress)=> {
      console.log(tagaddress);
      try{

      await RNBluetoothClassic.requestBluetoothEnabled();
      isEnabled = RNBluetoothClassic.isBluetoothEnabled();



      if( isEnabled )
      {
    // test if we can connect to device

        try{
          
          return await connectTo(tagaddress);
          
          
        }catch(error){
          console.log("Scanner not connected" + error);
        }

      }
      
      } catch(error){
        console.log("ERROR IN ENABLE");
      }

    };

    /*
    read: read from the bluetooth device
    returns: log of the pit id
    errors: possible errors can occur if scanner is not powered on
    also tends to work better immediatly after the pit tag has been scanned
    */
    const read = async(address)=>{
      try{
        let readFrom = await RNBluetoothClassic.readFromDevice(address);
        //console.log('Pit id', readFrom.slice(0,15));
        // isEnabled=false;

        pit = readFrom.slice(0,13);
        return pit;
      } catch(error){
        //console.log("scanner not powered on or scan pit tag")
      }
    }
    

    if( RNBluetoothClassic.isBluetoothAvailable()) {
      
      
      // test if bluetooth is enabled
      if (requestConnect()){

        

        await enable(tagaddress);

        // test pit
        //pit = "9891031615599";
        return pit;
      }


    }
      
    // else request bluetooth enabled (ANDROID) for ios  ask the user to enable 
    // end test
      
      else{
      console.log("Bluetooth is not supported");
      }

    }