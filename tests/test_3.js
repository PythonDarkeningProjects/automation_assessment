import { Selector } from 'testcafe';
import { CONSTANTS } from '../constants';
import HomeSelector from '../selectors/HomeSelector';


fixture `Automation Assessment -> Scenario 3`
    .page `${CONSTANTS.APP.URL}`;

test('Update First Device', async t => {
    // Step 1. Make an API call to get the devices
    const response = await t.request(CONSTANTS.SERVER.DEVICES.URL);
    const devicesFromAPI = response.body;

    // Step 2. Get the first device attributes from the API response
    const firstDevice = devicesFromAPI[0];
    const firstDeviceSystemName = firstDevice.system_name;
    const firstDeviceType = firstDevice.type;
    const firstDeviceHddCapacity = firstDevice.hdd_capacity;
    const firstDeviceId = firstDevice.id;

    // Step 3. Build the payload only changing the system_name
    const expectedSystemName = "Rename Device";
    const payload = {
        "system_name": expectedSystemName,
        "type": firstDeviceType,
        "hdd_capacity": firstDeviceHddCapacity
    };

    // Step 4. Make an API call to update the first device
    await t.request({
        url: `${CONSTANTS.SERVER.DEVICES.URL}/${firstDeviceId}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: payload    
    });

    // Step 5. Refresh the page
    await t.eval(() => location.reload(true));

    // Step 6. Verify that the device name has been updated in the DOM
    const element = Selector(HomeSelector.deviceName).withText(expectedSystemName).exists;
    await t.expect(element).ok(`The device: ${expectedSystemName} is not visible in the DOM`);
});
