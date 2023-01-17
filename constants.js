class Constants {
    APP = {
        URL: "http://localhost:3001"
    }
    SERVER = {
        DEVICES: {
            GET: "http://localhost:3000/devices"
        }
    }
    ELEMENT_IDENTIFIER = {
        DEVICE_INFO_CSS: ".device-info",
        DEVICE_NAME_CSS: ".device-name",
        DEVICE_TYPE_CSS: ".device-type",
        DEVICE_CAPACITY_CSS: ".device-capacity",
        DEVICE_EDIT: ".device-edit",
        DEVICE_REMOVE_CSS: ".device-remove"
    }
}

export const CONSTANTS = new Constants();