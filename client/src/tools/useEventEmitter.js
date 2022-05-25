import { useCallback, useContext, useEffect } from 'react'
import { EventEmitterRCContext } from './EventEmitterRC'

function useEmit() {
    const em = useContext(EventEmitterRCContext)
    return useCallback((type, ...args) =>
        (async () => await em.emit(type, ...args))()
    ,[em])
}

export function useEventEmitter() {
    const emit = useEmit()
    return {
        useListener: (
            type,
            listener,
            deps = [],
        ) => {
            const em = useContext(EventEmitterRCContext)
            useEffect(() => {
                em.add(type, listener)
                return () => {
                    em.remove(type, listener)
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [listener, type, ...deps])
        },
        emit,
    }
}
