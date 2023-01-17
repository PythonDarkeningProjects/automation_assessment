import { Selector } from 'testcafe';
import { CONSTANTS } from '../constants';
import { generateUUID } from '../utilities/common';
import DeviceAddSelector from '../selectors/DeviceAddSelector';
import HomeSelector from '../selectors/HomeSelector';


fixture `Automation Assessment -> Scenario 2`
    .page `${CONSTANTS.APP.URL}`;

test('Create New Device', async t => {
    // Step 1: Click on the Add Device button
    const addDeviceButton = Selector(HomeSelector.addDeviceButton);
    await t.click(addDeviceButton);

    // Step 2: Fill out the form
    const systemNameInput = Selector(DeviceAddSelector.systemNameInput);
    const selectTypeInput = Selector(DeviceAddSelector.selectTypeInput);
    const hddCapacityInput = Selector(DeviceAddSelector.hddCapacityInput);

    const uuid = generateUUID(8);
    const expectedDeviceName = `Test Device ${uuid}`;
    const expectedHddCapacity = `60`;
    const expectedType = `MAC`;

    await t.typeText(systemNameInput, expectedDeviceName);
    await t.typeText(hddCapacityInput, expectedHddCapacity);

    await t.click(selectTypeInput);
    await t.click(selectTypeInput.find('option').withText(expectedType));

    // Step 3: Click on the Save button
    await t.click(Selector(DeviceAddSelector.saveButton));

    // Step 4: Verify that the device was created
    const elements = Selector('div.device-main-box');
    const elementCount = await elements.count;
    let theElementWasCreatedProperly = false;

    // Step 5. Iterate through the elements and get the device name, type and capacity
    for (let i = 0; i < elementCount; i++) {
        const element = await elements.nth(i);  // Getting the nth element

        // Step 5.1 Getting the current device name, type and capacity from the DOM
        const deviceName = await element.find(HomeSelector.deviceName);
        const deviceType = await element.find(HomeSelector.deviceType);
        const deviceCapacity = await element.find(HomeSelector.deviceCapacity);

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

    await t.expect(theElementWasCreatedProperly).ok(`The device was not created properly`);
});
