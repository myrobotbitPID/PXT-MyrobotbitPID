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

enum Turn {
        //% block="left"
        Left,
        //% block="right"
        Right
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
    //% blockId="Motor_motoroff" block="motor %motorSEL | stop mode %StopMode"
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

/**
 * Turn direction with dual motors for line follow robot.
 * @param turnDIR      turn Left or Right
 * @param speedturn    motor speed; eg: 40
*/
//% blockId="Motor_followlineTurn" block="turn %Turn | speed %speedturn"
//% speedturn.min=0 speedturn.max=100
export function followlineTurn(turnDIR:Turn, speedturn:number): void {
      let motorspeedturn = pins.map(speedturn,0,100,0,1023)   
      if (turnDIR == Turn.Left) {
 	    pins.digitalWritePin(DigitalPin.P13, 0)
	    pins.digitalWritePin(DigitalPin.P14, 0) 
	    pins.analogWritePin(AnalogPin.P15, motorspeedturn)
            pins.digitalWritePin(DigitalPin.P16, 0)
       }
      if (turnDIR == Turn.Right) {
            pins.analogWritePin(AnalogPin.P14, motorspeedturn)
            pins.digitalWritePin(DigitalPin.P13, 0)
 	    pins.digitalWritePin(DigitalPin.P15, 0)
	    pins.digitalWritePin(DigitalPin.P16, 0)
       }
    }

/**
 * Execute dual motor to rotate with delay mS time to brake mode.
 * @param rotateDIR         	rotate robot direction.
 * @param speedrotate   	speed of motor; eg: 50
 * @param pausems       	time to brake; eg: 400
 */
 //% blockId="Motor_rotate" block="rotate  %Turn | speed %speedrotate | pause %pausems |mS"
 //% speedrotate.min=0 speedrotate.max=100
 export function Rotate(rotateDIR:Turn, speedrotate:number, pausems: number): void {
      let motorspeedrotate = pins.map(speedrotate,0,100,0,1023)      
      if (rotateDIR == Turn.Left) {
           pins.analogWritePin(AnalogPin.P14, motorspeedrotate)
           pins.digitalWritePin(DigitalPin.P13, 0) 
           pins.analogWritePin(AnalogPin.P15, motorspeedrotate)
           pins.digitalWritePin(DigitalPin.P16, 0)
	   basic.pause(pausems)	   
	   pins.digitalWritePin(DigitalPin.P13, 1)
	   pins.digitalWritePin(DigitalPin.P14, 1)
	   pins.digitalWritePin(DigitalPin.P15, 1)
	   pins.digitalWritePin(DigitalPin.P16, 1) 
      }
      if (rotateDIR == Turn.Right) {
           pins.analogWritePin(AnalogPin.P13, motorspeedrotate)
           pins.digitalWritePin(DigitalPin.P14, 0) 
           pins.analogWritePin(AnalogPin.P16, motorspeedrotate)
           pins.digitalWritePin(DigitalPin.P15, 0)
	   basic.pause(pausems)	   
	   pins.digitalWritePin(DigitalPin.P13, 1)
	   pins.digitalWritePin(DigitalPin.P14, 1)
	   pins.digitalWritePin(DigitalPin.P15, 1)
	   pins.digitalWritePin(DigitalPin.P16, 1)  
       }
    }

/**
 * Execute dual motor to rotate Left and Right non stop for use linefollow mode.
 * @param rotateLINE     	rotate robot direction.
 * @param speedline     	motor speed; eg: 50
 */
 //% blockId="Motor_rotatenotime"  block="rotate %Turn |speed %speedline"
 //% speedline.min=0 speedline.max=100
 export function RotateNOTIME(rotateLINE:Turn, speedline:number): void {
      let motorspeedline = pins.map(speedline,0,100,0,1023)      
      if (rotateLINE == Turn.Left) {
           pins.analogWritePin(AnalogPin.P14, motorspeedline)
           pins.digitalWritePin(DigitalPin.P13, 0) 
           pins.analogWritePin(AnalogPin.P15, motorspeedline)
           pins.digitalWritePin(DigitalPin.P16, 0)
      }
      if (rotateLINE == Turn.Right) {
           pins.analogWritePin(AnalogPin.P13, motorspeedline)
           pins.digitalWritePin(DigitalPin.P14, 0) 
           pins.analogWritePin(AnalogPin.P16, motorspeedline)
           pins.digitalWritePin(DigitalPin.P15, 0)
       }
    }

/**
 * Execute puase time
 * @param pausetime  	mSec to delay; eg: 100
*/
 //% pausetime.min=1  pausetime.max=100000
 //% blockId=Motor_TimePAUSE block="pause | %pausetime | mS"
 export function TimePAUSE(pausetime: number): void {
	basic.pause(pausetime)
        }
	
}
