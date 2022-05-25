export class EventEmitter {
    events = new Map()


    add(type, callback) {
        const callbacks = this.events.get(type) || []
        callbacks.push(callback)
        this.events.set(type, callbacks)
        return this
    }

    remove(type, callback) {
        const callbacks = this.events.get(type) || []
        this.events.set(
            type,
            callbacks.filter((fn) => fn !== callback)
        )
        return this
    }

    removeByType(type) {
        this.events.delete(type)
        return this
    }

    async emit(type, ...args) {
        const callbacks = this.events.get(type) || []
        let result = {};

        for(const fn of callbacks) {
            args[0]._eventResult = result
            const stepResult = await fn(...args)
            if(stepResult?.error)
                throw new Error(stepResult.error)
            result = {...result, ...stepResult || {}}
        }
        return result
    }

    listeners(type) {
        return Object.freeze(this.events.get(type) || [])
    }
}
