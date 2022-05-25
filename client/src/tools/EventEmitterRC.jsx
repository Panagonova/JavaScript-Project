import React from 'react'
import { createContext } from 'react'
import { EventEmitter } from './EventEmitter'

export const EventEmitterRCContext = createContext(
    null
)

const EventEmitterRC = (props) => {
    return (
        <EventEmitterRCContext.Provider value={new EventEmitter()}>
            {props.children}
            </EventEmitterRCContext.Provider>
    )
}

export default EventEmitterRC
