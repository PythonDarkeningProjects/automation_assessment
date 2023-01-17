import { CONSTANTS } from '../constants';
import HomeSelector from '../selectors/HomeSelector';

const uuid = require("uuid");
const assert = require("assert");


function generateUUID(numOfChars) {
    assert(numOfChars <= 36, "Number of characters should be less than or equal to 36");
    let uuid_x = uuid.v4().substring(0, numOfChars);
    return uuid_x;
}

async function getDevicesFromAPI(t){
    const response = await t.request(CONSTANTS.SERVER.DEVICES.URL);
    return response.body;
}

async function getDevicesFromUI(elements){
    let devicesFromUI = [];

    for (let i = 0; i < elements.count; i++) { // Iterating over the elements
        const element = elements.nth(i);  // Getting the nth element

        // Getting the device name, type and capacity from the DOM
        const deviceName = element.find(HomeSelector.deviceName);
        const deviceType = element.find(HomeSelector.deviceType);
        const deviceCapacity = element.find(HomeSelector.deviceCapacity);

        devicesFromUI.push({
            "system_name": deviceName, "type": deviceType,  "hdd_capacity": deviceCapacity
        });
    }

    return devicesFromUI;
}

async function getDevicesFromUIOnlyText(elements){
    let devicesFromUI = [];

    for (let i = 0; i < elements.count; i++) {
        const element = elements.nth(i);  // Getting the nth element

        // Getting the device name, type and capacity from the DOM
        const deviceName = element.find(HomeSelector.deviceName);
        const deviceType = element.find(HomeSelector.deviceType);
        const deviceCapacity = element.find(HomeSelector.deviceCapacity);


        // Adding the device name, type and capacity to the devicesFromUI array
        let currentDeviceCapacity = await deviceCapacity.innerText;
        currentDeviceCapacity = currentDeviceCapacity.replace(/[^0-9]/g, ""); // Getting only the numbers from the string
        devicesFromUI.push({
            "system_name": await deviceName.innerText, "type": await deviceType.innerText,  "hdd_capacity": currentDeviceCapacity
        });
    }

    return devicesFromUI;
}

async function validateDevicesExistInDOM(t, elements){
    const devices = getDevicesFromUI(elements);

    for (let i = 0; i < elements.count; i++) {
        const device = elements.nth(i);  // Getting the nth element
        
        // Assert that the device name, type and capacity are visible in the DOM
        await t.expect(await device.system_name.exists).ok(`The device name: ${await device.system.innerText} is not visible`);
        await t.expect(await device.type.exists).ok(`The device type: ${await device.type.innerText} is not visible`);
        await t.expect(await device.hdd_capacity.exists).ok(`The device capacity: ${await device.hdd_capacity.innerText} is not visible`);
    }
}

async function validateDevicesButtonsExistInDOM(t, elements){
    const devices = getDevicesFromUI(elements);

    for (let i = 0; i < elements.count; i++) {
        const device = elements.nth(i);  // Getting the nth element

        // Getting the edit and remove buttons from the DOM
        const editButton = device.find(HomeSelector.editButton);
        const removeButton = device.find(HomeSelector.removeButton);

        // Assert that the edit and remove buttons are visible in the DOM
        await t.expect(await editButton.exists).ok(`The edit button is not visible in the DOM for the device: ${await device.system_name}`);
        await t.expect(await removeButton.exists).ok(`The remove button is not visible in the DOM for the device: ${await device.system_name}`);
    }
}

async function compareDevicesFromAPIAndUI(t, devicesFromAPI, devicesFromUI){
    // Get the difference between the devices from the API and the devices from the UI
    const difference = devicesFromUI.filter(deviceUI => {
        return !devicesFromAPI.some(deviceAPI => {
            return deviceAPI.system_name === deviceUI.system_name &&
                    deviceAPI.type === deviceUI.type &&
                    deviceAPI.hdd_capacity === deviceUI.hdd_capacity;
        });
    });

    // Check if the difference is empty for all the elements
    let isValid = true;
    for (let i = 0; i < difference.length; i++) {
        if (JSON.stringify(difference[i]) !== JSON.stringify({})) {
            isValid = false;
            break;
        }
    }

    // Assert that the difference is empty for all the elements
    await t.expect(isValid).ok(`The difference between the devices from the API and the devices from the UI is not empty. Difference: ${JSON.stringify(difference, null, 4)}`);
}

async function theDeviceWasCreatedProperly(t, elements, expectedDeviceName, expectedType, expectedHddCapacity){
    let theElementWasCreatedProperly = false;

    for (let i = 0; i < await elements.count; i++) {
        const element = elements.nth(i);  // Getting the nth element

        // Step 5.1 Getting the current device name, type and capacity from the DOM
        const deviceName = element.find(HomeSelector.deviceName);
        const deviceType = element.find(HomeSelector.deviceType);
        const deviceCapacity = element.find(HomeSelector.deviceCapacity);

        if(await deviceName.innerText == expectedDeviceName){
            // Step 5.2 Assert that the type and capacity are the expected ones
            let currentDeviceCapacity = await deviceCapacity.innerText;
            currentDeviceCapacity = currentDeviceCapacity.replace(/[^0-9]/g, ""); // Getting only the numbers from the string
            await t.expect(deviceType.innerText).eql(expectedType, `The device type is not the expected one, expected: ${expectedType}, actual: ${deviceType}`);
            await t.expect(currentDeviceCapacity).eql(expectedHddCapacity, `The device capacity is not the expected one, expected: ${expectedHddCapacity}, actual: ${currentDeviceCapacity}`);


            // Step 5.3 Assert that the device name, type and capacity exists in the DOM
            await t.expect(await deviceName.exists).ok(`The device name: ${deviceName} is not visible`);
            await t.expect(await deviceType.exists).ok(`The device type: ${deviceType} is not visible`);
            await t.expect(await deviceCapacity.exists).ok(`The device capacity: ${deviceCapacity} is not visible`);

            theElementWasCreatedProperly = true;
        }
    }

    return theElementWasCreatedProperly;
}

function getDeviceAttributesByIndex(devicesFromAPI, index){
    const firstDevice = devicesFromAPI[index];
    return {
        'systemName': firstDevice.system_name,
        'type': firstDevice.type,
        'hddCapacity': firstDevice.hdd_capacity,
        'id': firstDevice.id
    }
}

module.exports = {
    generateUUID, 
    getDevicesFromAPI,
    getDevicesFromUI,
    getDevicesFromUIOnlyText,
    validateDevicesExistInDOM,
    validateDevicesButtonsExistInDOM,
    compareDevicesFromAPIAndUI,
    theDeviceWasCreatedProperly,
    getDeviceAttributesByIndex
};