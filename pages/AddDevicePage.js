import { Selector } from 'testcafe';
import HomeSelector from '../selectors/HomeSelector';
import DeviceAddSelector from '../selectors/DeviceAddSelector';


class AddeDevicePage {
    constructor() {
        this.addDeviceButton = Selector(HomeSelector.addDeviceButton);
        this.systemNameInput = Selector(DeviceAddSelector.systemNameInput);
        this.selectTypeInput = Selector(DeviceAddSelector.selectTypeInput);
        this.hddCapacityInput = Selector(DeviceAddSelector.hddCapacityInput);
        this.saveButton = Selector(DeviceAddSelector.saveButton);
    }

    async clickOverAddDeviceButton(t) {
        await t
            .click(this.addDeviceButton);
    }

    async clickOverSaveButton(t) {
        await t
            .click(this.saveButton);
    }


    async fillOutForm(t, systemName, hddCapacity, type) {
        await t
            .typeText(this.systemNameInput, systemName)
            .typeText(this.hddCapacityInput, hddCapacity)
            .click(this.selectTypeInput)
            .click(this.selectTypeInput.find('option').withText(type));
    }
}

export default AddeDevicePage;
