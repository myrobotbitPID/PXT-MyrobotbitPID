/**
  * Coding for control of Motor.
  */
enum motorSEL {
    //% block="A"
    M1,
    //% block="B"
    M2,
     //% block="AB"
    M12
}

enum motorDIR {
    //% block="Forward"
    Forward,
    //% block="Reverse"
    Reverse
}

enum StopMode {
        //% block="brake"
        Brake,
        //% block="coast"
        Coast
}


/**
 * Custom blocks
 */
//% weight=50 color=#ff6600 weight=10 icon="\uf11e"
namespace MyBIT {

    /**MotorON set Motor Channel and Direction. The speed motor is adjustable between 0 to 100.   
      * @param Speed percent of maximum Speed, eg: 50
      */
    //% blockId="ibit_MotorON" block="motor %motorSEL | direction %motorDIR | speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=100
    export function MotorON(Channel:motorSEL, Direction:motorDIR, Speed:number): void {
        let motorspeed = pins.map(Speed, 0, 100, 0, 1023)  
        
        if (Channel == motorSEL.M1 && Direction == motorDIR.Forward) {
           pins.analogWritePin(AnalogPin.P13, motorspeed)
           pins.digitalWritePin(DigitalPin.P14, 0)
        }
        else if (Channel == motorSEL.M2 && Direction == motorDIR.Forward) {
           pins.analogWritePin(AnalogPin.P15, motorspeed)
           pins.digitalWritePin(DigitalPin.P16, 0)
        }
        else if (Channel == motorSEL.M1 && Direction == motorDIR.Reverse) {
           pins.analogWritePin(AnalogPin.P14, motorspeed)
           pins.digitalWritePin(DigitalPin.P13, 0)
        }
        else if (Channel == motorSEL.M2 && Direction == motorDIR.Reverse) {
           pins.analogWritePin(AnalogPin.P16, motorspeed)
           pins.digitalWritePin(DigitalPin.P15, 0)  
        }
        else if (Channel == motorSEL.M12 && Direction == motorDIR.Forward) {
            pins.analogWritePin(AnalogPin.P13, motorspeed)
            pins.digitalWritePin(DigitalPin.P14, 0)
			         pins.analogWritePin(AnalogPin.P15, motorspeed)
            pins.digitalWritePin(DigitalPin.P16, 0)
        }
        else if (Channel == motorSEL.M12 && Direction == motorDIR.Reverse) {
            pins.analogWritePin(AnalogPin.P14, motorspeed)
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
            pins.digitalWritePin(DigitalPin.P15, 0)
        }
    }

    /**
     * Turns off the motor
     * @param motor which motor to turn off
     */
    //% blockId=Motor_motoroff
    //% block="motor %motorSEL | stop mode %StopMode"
    export function motorOFF(Channel:motorSEL, stop:StopMode): void {
        if (Channel == motorSEL.M12 && stop == StopMode.Brake) {
		pins.digitalWritePin(DigitalPin.P13, 1)
		pins.digitalWritePin(DigitalPin.P14, 1)
		pins.digitalWritePin(DigitalPin.P15, 1)
		pins.digitalWritePin(DigitalPin.P16, 1) 
        }
        else if (Channel == motorSEL.M12 && stop == StopMode.Coast) {
		pins.digitalWritePin(DigitalPin.P13, 0)
		pins.digitalWritePin(DigitalPin.P14, 0)
		pins.digitalWritePin(DigitalPin.P15, 0)
		pins.digitalWritePin(DigitalPin.P16, 0)  
        }
        else if (Channel == motorSEL.M1 && stop == StopMode.Brake) {
		pins.digitalWritePin(DigitalPin.P13, 1)
		pins.digitalWritePin(DigitalPin.P14, 1) 
        }
        else if (Channel == motorSEL.M1 && stop == StopMode.Coast) {
		pins.digitalWritePin(DigitalPin.P13, 0)
		pins.digitalWritePin(DigitalPin.P14, 0) 
        }
        else if (Channel == motorSEL.M2 && stop == StopMode.Brake) {
		pins.digitalWritePin(DigitalPin.P15, 1)
		pins.digitalWritePin(DigitalPin.P16, 1) 
        }
        else if (Channel == motorSEL.M2 && stop == StopMode.Coast) {
 		pins.digitalWritePin(DigitalPin.P15, 0)
		pins.digitalWritePin(DigitalPin.P16, 0)
        }
    }

}
