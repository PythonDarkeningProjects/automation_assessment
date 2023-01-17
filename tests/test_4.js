import { Selector } from 'testcafe';
import { CONSTANTS } from '../constants';
import HomeSelector from '../selectors/HomeSelector';


fixture `Automation Assessment -> Scenario 4`
    .page `${CONSTANTS.APP.URL}`;

test('Delete and element from the list', async t => {
    // Step 1. Make an API call to get the devices
    const response = await t.request(CONSTANTS.SERVER.DEVICES.URL);
    const devicesFromAPI = response.body;

    // Step 2. Get a random device from the API response
    const lastDeviceFromList = devicesFromAPI[devicesFromAPI.length - 1];
    const lastDeviceSystemName = lastDeviceFromList.system_name;
    const lastDeviceId = lastDeviceFromList.id;


    // Step 3. Make an API call to delete the element
    await t.request({
        url: `${CONSTANTS.SERVER.DEVICES.URL}/${lastDeviceId}`,
        method: 'DELETE'
        }
    );
    
    // Step 4. Refresh the page
    await t.eval(() => location.reload(true));

    // Step 5. Verify the element is not visible in the DOM or in the page
    const element = Selector(HomeSelector.deviceName).withText(lastDeviceSystemName);
    await t.expect(element.exists).notOk(`The device: ${lastDeviceSystemName} is still visible in the DOM`);
    await t.expect(element.visible).notOk(`The device: ${lastDeviceSystemName} is still visible in the Page`);
});
