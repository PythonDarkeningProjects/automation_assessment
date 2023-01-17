
class HomeSelector {
    constructor() {
        this.elements = '.device-main-box';
        this.addDeviceButton ='.submitButton';
        this.deviceInfo = '.device-info';
        this.deviceName = '.device-name';
        this.deviceType = '.device-type';
        this.deviceCapacity = '.device-capacity';
        this.editButton = '.device-edit';
        this.removeButton = '.device-remove';
    }
}

export default new HomeSelector();