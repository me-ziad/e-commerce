import { easeIn, easeInOut, easeOut } from 'framer-motion'
import React from 'react'

export const  FadeIn =(direction, delay)=>{
  return {

        hidden : {
            y : direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x : direction === 'left' ? 100 : direction === 'right' ? -100 : 0, 
            opacity  : 0,
        },
        show : {
            y : 0,
            x : 0,
            opacity  : 1,
            transition : {
                type  : 'tween',
                duration : .5,
                delay : delay,
                easeOut : [0.70,0.70,0.70,0.70],
            }
        }



  }
}
