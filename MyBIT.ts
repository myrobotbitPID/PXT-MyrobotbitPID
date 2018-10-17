/**
  * Enumeration of Motor.
  */
enum motor {
    //% block="Forward"
    Forward,
    //% block="Reverse"
    Reverse
}

enum motorCH {
    //% block="Motor A"
    MotorA,
    //% block="Motor B"
    MotorB,
    //% block="Motor AB"
    MotorAB
}

/**
 * Custom blocks
 */
//% weight=50 color=#ff6600 icon="\uf11e"
namespace MyBIT {
    /**MotorCH set Motor Channel and Direction. The speed motor is adjustable between 0 to 100.   
      * @param Speed percent of maximum Speed, eg: 50
      */
    //% blockId="ibit_MotorCH" block="Motor %motorCH | Direction %Motor | Speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=100
    export function MotorCH(Channel:motorCH, Direction:motor, Speed:number): void {
        let motorspeed = pins.map(Speed, 0, 100, 0, 1023)  
        
        if (Channel == motorCH.MotorA && Direction == motor.Forward) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, motorspeed)            
        }
        else if (Channel == motorCH.MotorB && Direction == motor.Forward) {
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
        else if (Channel == motorCH.MortorA && Direction == motor.Reverse) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, motorspeed)  
        }
        else if (Channel == motorCH.MotorB && Direction == motor.Reverse) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, motorspeed)
        }
    }
}
