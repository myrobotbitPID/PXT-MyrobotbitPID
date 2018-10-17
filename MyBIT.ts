/**
  * Enumeration of Motor.
  */
enum motor {
    //% block="Forward"
    Forward,
    //% block="Backward"
    Backward
}

enum motorCH {
    //% block="1"
    M1,
    //% block="2"
    M2
}

/**
 * Custom blocks
 */
//% weight=50 color=#ff6600 weight=10 icon="\uf11e"
namespace iBIT {

    /**MotorCH set Motor Channel and Direction. The speed motor is adjustable between 0 to 100.   
      * @param Speed percent of maximum Speed, eg: 50
      */
    //% blockId="ibit_MotorCH" block="Motor %motorCH | Direction %Motor | Speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=100
    export function MotorCH(Channel:motorCH, Direction:motor, Speed:number): void {
        let motorspeed = pins.map(Speed, 0, 100, 0, 1023)  
        
        if (Channel == motorCH.M1 && Direction == motor.Forward) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, motorspeed)            
        }
        else if (Channel == motorCH.M2 && Direction == motor.Forward) {
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        else if (Channel == motorCH.M1 && Direction == motor.Backward) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, motorspeed)  
        }
        else if (Channel == motorCH.M2 && Direction == motor.Backward) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
    }
}
