interface iMacbookPro {
  useUSBCPort(): string;
}

interface iHeadset {
  useUSBPort(): string;
}

class MacbookPro implements iMacbookPro {
  useUSBCPort() {
    return "Using he USB-C port";
  }
}

class Headset implements iHeadset {
  useUSBPort() {
    return "Using USB port";
  }
}

class USBToUSBCAdaptor {
  device: iHeadset;

  constructor(device: iHeadset) {
    this.device = device;
  }

  useUSBCPort() {
    console.log("Converting To USB Type C...");
    this.device.useUSBPort();
    return "Using the USB Type C Adaptor!!";
  }
}
