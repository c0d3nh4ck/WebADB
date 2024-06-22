import React from "react";
import Adb from "./webadb";

let usb, adb;

let init = async () => {
  try {
    console.log("Initializing connecetion to USB");
    usb = await Adb.open("WebUSB");
  } catch (err) {
    throw new Error("Unable to connect to USB");
  }
};

let connect = async () => {
  if (usb.isAdb()) {
    try {
      adb = await usb.connectAdb("host::", () => {
        console.log("Connecting to " + usb.device.productName + ".");
      });
    } catch (err) {
      throw new Error("Unable to connect to ADB");
    }
  } else {
    usb.close();
    throw new Error("The device is not Android");
  }
};

let execute = async (cmd) => {
  try {
    let shell = await adb.shell(cmd);
    let response = await shell.receive();
    const decoder = new TextDecoder("utf-8");
    console.log(decoder.decode(response.data));
  } catch (err) {
    usb.close();
    throw new Error(err);
  }
};

// document.getElementById("connect").onclick = async () => {
//   try {
//     await init();
//     await connect();
//     window.adb = adb;
//     window.usb = usb;
//     window.execute = execute;    // can run it in console like `execute('command_to_run')`
//   } catch (err) {
//     alert(err.message);
//   }
// };

class Adbsh extends React.Component {
  constructor(props) {
    super(props);
    this.cmdExec = this.cmdExec.bind(this);
  }

  async cmdExec() {
    try {
      await init();
      await connect();
      window.adb = adb;
      window.usb = usb;
      window.execute = execute; // can run it in console like `execute('command_to_run')`
    } catch (err) {
      alert(err.message);
    }
  }

  render() {
    return (
      <button id="connect" onClick={this.cmdExec}>
        Connect and Open ADB Shell
      </button>
    );
  }
}

export default Adbsh;
