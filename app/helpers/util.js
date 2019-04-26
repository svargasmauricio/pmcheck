import moment from 'moment';

export function FormatData(date){
  if(date instanceof Date){
    return moment(String(date)).format('DD/MM/YYYY HH:mm')
  }else{
    var moment_date = moment(date, 'DD/MM/YYYY HH:mm').toDate();
    return moment(String(moment_date)).format('DD/MM/YYYY HH:mm')
  }  
}

export function indexWhere(array, conditionFn) {
  console.log(array)
  const item = array.find(conditionFn)
  return array.indexOf(item)
}

export function LerQrCode(){
    var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;
    var barcodescanner = new BarcodeScanner();

    return new Promise((result, error) => {    
          
      return barcodescanner.scan({
        formats: "QR_CODE,PDF_417",   // Pass in of you want to restrict scanning to certain types
        cancelLabel: "CANCELAR", // iOS only, default 'Close'
        showFlipCameraButton: true,   // default false
        preferFrontCamera: false,     // default false
        showTorchButton: true,        // default false
        beepOnScan: true,             // Play or Suppress beep on scan (default true)
        torchOn: false,               // launch with the flashlight on (default false)
        closeCallback: function () { console.log("Scanner closed"); }, // invoked when the scanner was closed (success or abort)
        resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
        orientation: "portrait",     // Android only, optionally lock the orientation to either "portrait" or "landscape"
        openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
      }).then(response => result(  response.text  )).catch(() => error)
      
    });
}