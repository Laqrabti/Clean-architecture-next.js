import { time } from "console"

function throttleWithTrailing(fn: Function, delay: number): Function{

    let timer: NodeJS.Timeout | null = null
    let lastRun = 0

    return (...arg: any[]) => {
        const now = Date.now()
        const timeSinceLastRun = now - lastRun

        if (timeSinceLastRun > delay) {
             fn(...arg) 
             lastRun = now
        }

        if (timer) {
            
        }

        


    }
    
    


}