import hid

def get_available_devices():
    devices = []
    for device in hid.enumerate():
        devices.append((device['vendor_id'],device['product_id']))
    return devices

class Mapper():
    def __init__(self, device_vendor_id, device_product_id) -> None:
        self.device = hid.device()
        self.device.open(device_vendor_id,device_product_id)
        self.device.set_nonblocking(True)
        self.state = 0

    def start(self):
        pass
    

if __name__ == "__main__":
    mapper = Mapper(*get_available_devices()[0])
