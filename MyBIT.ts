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
    //% block="Backward"
    Backward
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
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, motorspeed)            
        }
        else if (Channel == motorSEL.M2 && Direction == motorDIR.Forward) {
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        else if (Channel == motorSEL.M1 && Direction == motorDIR.Backward) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, motorspeed)  
        }
        else if (Channel == motorSEL.M2 && Direction == motorDIR.Backward) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        else if (Channel == motorSEL.M12 && Direction == motorDIR.Forward) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        else if (Channel == motorSEL.M12 && Direction == motorDIR.Backward) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
    }
}
