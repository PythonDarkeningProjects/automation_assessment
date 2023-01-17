import { CONSTANTS } from '../constants';
import { 
    compareDevicesFromAPIAndUI,
    getDevicesFromAPI,
    getDevicesFromUIOnlyText,
    validateDevicesExistInDOM,
    validateDevicesButtonsExistInDOM,
    getDeviceAttributesByIndex,
    generateUUID
} from '../utilities/common';
import { updateDeviceAttributes, deleteDevice } from '../utilities/requests';
import HomePage from '../pages/HomePage';
import AddeDevicePage from '../pages/AddDevicePage';

fixture `Automation Assessment -> Scenario 1`
    .page `${CONSTANTS.APP.URL}`;

// Page Objects    
const homePage = new HomePage();
const addeDevicePage = new AddeDevicePage();

test('Test #1 -> API call test', async t => {
    // Step 1. Get all the devices from the API
    const devicesFromAPI = await getDevicesFromAPI(t);

    // Step 2. Assert that the response is not empty and has the devices
    await t.expect(Array.isArray(devicesFromAPI) && devicesFromAPI.length).ok();

    // Step 3. Get all the elements with the class name 'device-info' from the DOM
    const elements = await homePage.getAllPageElements(t);

    // Step 4. Get the number of elements
    const elementCount = await elements.count;

    // Step 5. Assert that the number of elements is equal to the number of devices
    await t.expect(elementCount).eql(devicesFromAPI.length, `Expected ${devicesFromAPI.length} elements but found ${elementCount}`);

    // Step 6. Assert that the devices exist in the DOM
    await validateDevicesExistInDOM(t, elements);

    // Step 7. Assert that the buttons exist in the DOM
    await validateDevicesButtonsExistInDOM(t, elements);

    // Step 8. Assert that the devices from the API are the same as the devices from the UI
    let devicesFromUI = await getDevicesFromUIOnlyText(elements);
    await compareDevicesFromAPIAndUI(t, devicesFromAPI, devicesFromUI);
});


test('Test #2 -> Create New Device', async t => {
    // Step 1: Click on the Add Device button
    addeDevicePage.clickOverAddDeviceButton(t);

    // Step 2: Fill out the form
    const expectedDeviceName = `Test Device ${generateUUID(8)}`;
    const expectedHddCapacity = '60';
    const expectedType = 'MAC';
    await addeDevicePage.fillOutForm(t, expectedDeviceName, expectedHddCapacity, expectedType);

    // Step 3: Click on the Save button
    await addeDevicePage.clickOverSaveButton(t);

    // Step 4: Verify that the device was created
    const elements = await homePage.getAllPageElements(t);
    homePage.validateDeviceWasCreatedProperly(t, elements, expectedDeviceName, expectedType, expectedHddCapacity);
});

test('Test #3 -> Update First Device', async t => {
    // Step 1. Get all the devices from the API
    const devicesFromAPI = await getDevicesFromAPI(t);

    // Step 2. Get the first device attributes from the API response
    const device = getDeviceAttributesByIndex(devicesFromAPI, 0);

    // Step 3. Build the payload only changing the system_name
    device.systemName = `Rename Device`; // This is the only attribute that will be updated
    await updateDeviceAttributes(t, device);

    // Step 5. Refresh the page
    await t.eval(() => location.reload(true));

    // Step 6. Verify that the device name has been updated in the DOM
    homePage.validateDeviceExistsInDomBySystemName(t, device.systemName);
});


test('Test #4 -> Delete and element from the list', async t => {
    // Step 1. Get all the devices from the API
    const devicesFromAPI = await getDevicesFromAPI(t);

    // Step 2. Get the last device from the API response
    const device = devicesFromAPI[devicesFromAPI.length - 1];

    // Step 3. Make an API call to delete the element
    await deleteDevice(t, device);
    
    // Step 4. Refresh the page
    await t.eval(() => location.reload(true));

    // Step 5. Verify the element is not visible in the DOM or in the page
    homePage.validateDeviceNotExistsInDomBySystemName(t, device.system_name);
});
