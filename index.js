module.exports = {
    events: {},

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        const subscriberMap = new Map([[subscriber, handler]]);

        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        } 
        
        this.events[event].push(subscriberMap);

        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if (!this.events.hasOwnProperty(event)) {
            return this;
        }

        this.events[event] = this.events[event].filter((item, index) => {
            return !item.has(subscriber);
        });

        if (!this.events[event].length) {
            delete this.events[event];
        }

        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (!this.events.hasOwnProperty(event)) {
            return this; 
        }

        this.events[event].forEach(item => {
            for (var [key, value] of item) {
                value.call(key);
            }
        }); 
        
        return this;
    }
};


//решение:
var subscriptions = [];

module.exports = {
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        // Сохраняем полную информацию
        subscriptions.push({
            event: event,
            subscriber: subscriber,
            handler: handler
        });

        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        // Удаляем всю информацию, связанную с событием и подписчиком
        subscriptions = subscriptions.filter(function (subscription) {
            return subscription.event !== event || subscription.subscriber !== subscriber;
        });

        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        subscriptions.forEach(function (subscription) {
            if (event === subscription.event) {
                // Вызываем обработчик в контексте объект-подписчика
                subscription.handler.call(subscription.subscriber);
            }
        });

        return this;
    }
};