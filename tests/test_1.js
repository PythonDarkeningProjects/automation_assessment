import { Selector } from 'testcafe';
import { CONSTANTS } from '../constants';
import HomeSelector from '../selectors/HomeSelector';


fixture `Automation Assessment -> Scenario 1`
    .page `${CONSTANTS.APP.URL}`;

test('API call test', async t => {
    // Step 1. Make an API call to get the devices
    const response = await t.request(CONSTANTS.SERVER.DEVICES.URL);
    const devicesFromAPI = response.body;

    // Step 2. Assert that the response is not empty and has the devices
    await t.expect(Array.isArray(devicesFromAPI) && devicesFromAPI.length).ok();

    // Step 3. Get all the elements with the class name 'device-info' from the DOM
    const elements = Selector('div.device-main-box');

    // Step 4. Get the number of elements
    const elementCount = await elements.count;

    // Step 5. Assert that the number of elements is equal to the number of devices
    await t.expect(elementCount).eql(devicesFromAPI.length, `Expected ${devicesFromAPI.length} elements but found ${elementCount}`);

    // Step 6. Iterate over the elements using a for each loop
    let devicesFromUI = [];
    for (let i = 0; i < elementCount; i++) {
        const element = await elements.nth(i);  // Getting the nth element

        // Step 6.1 Getting the device name, type and capacity from the DOM
        const deviceName = await element.find(HomeSelector.deviceName);
        const deviceType = await element.find(HomeSelector.deviceType);
        const deviceCapacity = await element.find(HomeSelector.deviceCapacity);
        
        // Step 6.2 Assert that the device name, type and capacity exists in the DOM
        await t.expect(await deviceName.exists).ok(`The device name: ${deviceName} is not visible`);
        await t.expect(await deviceType.exists).ok(`The device type: ${deviceType} is not visible`);
        await t.expect(await deviceCapacity.exists).ok(`The device capacity: ${deviceCapacity} is not visible`);

        // Step 6.3 Getting the buttons edit/remove from the DOM
        const editButton = await element.find(HomeSelector.editButton);
        const removeButton = await element.find(HomeSelector.removeButton);

        // Step 6.4 Assert that the buttons edit/remove exists in the DOM
        await t.expect(await editButton.exists).ok(`The edit button is not visible in the DOM for the device: ${deviceName}`);
        await t.expect(await removeButton.exists).ok(`The remove button is not visible in the DOM for the device: ${deviceName}`);


        // Step 6.5 Adding the device name, type and capacity to the devicesFromUI array
        let currentDeviceCapacity = await deviceCapacity.innerText;
        currentDeviceCapacity = currentDeviceCapacity.replace(/[^0-9]/g, ""); // Getting only the numbers from the string
        devicesFromUI.push({
            "system_name": await deviceName.innerText, 
            "type": await deviceType.innerText, 
            "hdd_capacity": currentDeviceCapacity
        });
    }

    // Step 7. Get the difference between the devices from the API and the devices from the UI
    const difference = devicesFromUI.filter(deviceUI => {
        return !devicesFromAPI.some(deviceAPI => {
            return deviceAPI.system_name === deviceUI.system_name &&
                   deviceAPI.type === deviceUI.type &&
                   deviceAPI.hdd_capacity === deviceUI.hdd_capacity;
        });
    });

    // Step 8. Check if the difference is empty for all the elements
    let isValid = true;
    for (let i = 0; i < difference.length; i++) {
        if (JSON.stringify(difference[i]) !== JSON.stringify({})) {
            isValid = false;
            break;
        }
    }

    // Step 9. Assert that the difference is empty for all the elements
    await t.expect(isValid).ok(`The difference between the devices from the API and the devices from the UI is not empty. Difference: ${JSON.stringify(difference, null, 4)}`);
});
