import { toast } from 'react-toastify';

class ManagementModule {
  constructor(client, store) {
    this.client = client;
    this.store = store;
  }

  getModuleActions = () => {
    return {};
  };

  handleError = (code, message) => {
    toast.error(message);
    console.error(code, message);
  };

  handleRoomChange = (room) => {};
}

export default ManagementModule;
