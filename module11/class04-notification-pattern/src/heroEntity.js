import NotificationContext from "./notificationContext.js"

export default class HeroEntity extends NotificationContext {
    constructor({ name, age }) {
        super()

        this.name = name
        this.age = age
    }

    isValid() {
        if (this.age < 20) {
            this.addNotification('Hero must be higher than 20!')
        }
    
        if (this.name.length < 3) {
            this.addNotification('Hero name must be higher than 3 characters!')
        }

        return !this.hasNotifications()
    }
}