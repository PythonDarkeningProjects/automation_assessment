import { CONSTANTS } from '../constants';


async function updateDeviceAttributes(t, device){
    const payload = {
        "system_name": device.systemName,
        "type": device.type,
        "hdd_capacity": device.hddCapacity
    };

    // Step 4. Make an API call to update the first device
    await t.request({
        url: `${CONSTANTS.SERVER.DEVICES.URL}/${device.id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: payload    
    });

}

async function deleteDevice(t, device){
    // Step 4. Make an API call to delete the first device
    await t.request({
        url: `${CONSTANTS.SERVER.DEVICES.URL}/${device.id}`,
        method: 'DELETE',
    });
}

module.exports = {
    updateDeviceAttributes,
    deleteDevice
}
