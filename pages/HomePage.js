import { Selector } from 'testcafe';
import HomeSelector from '../selectors/HomeSelector';
import DeviceAddSelector from '../selectors/DeviceAddSelector';
import { theDeviceWasCreatedProperly } from '../utilities/common';


class HomePage {
    constructor() {
        this.elements = Selector(HomeSelector.elements);
    }

    async getAllPageElements(t) {
        return this.elements;
    }

    async validateDeviceWasCreatedProperly(t, elements, expectedDeviceName, expectedDeviceType, expecteDeviceCapacity) {
        const deviceWasCreatedProperly = await theDeviceWasCreatedProperly(t, elements, expectedDeviceName, expectedDeviceType, expecteDeviceCapacity);
        await t.expect(deviceWasCreatedProperly).ok(`The device: ${expectedDeviceName} was not properly created`);
    }

    async validateDeviceExistsInDomBySystemName(t, systemName) {
        const element = Selector(HomeSelector.deviceName).withText(systemName).exists;
        await t.expect(element).ok(`The device: ${systemName} is not visible in the DOM`);
    }

    async validateDeviceNotExistsInDomBySystemName(t, systemName) {
        const element = Selector(HomeSelector.deviceName).withText(systemName);
        await t.expect(element.exists).notOk(`The device: ${systemName} is still visible in the DOM`);
        await t.expect(element.visible).notOk(`The device: ${systemName} is still visible in the Page`);
    }
}

export default HomePage;
