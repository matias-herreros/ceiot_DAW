import { Device } from "./interfaces/device.interface";
import { buildItemList } from "./utils/listBuilder.js";

declare var M: any;
class Main implements EventListenerObject {
  private backendRequest(
    method: string,
    path: string,
    cb: (arg?: any) => void,
    payload?: Object
  ) {
    let xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = () => {
      if (xmlRequest.readyState == 4) {
        if (xmlRequest.status == 200) {
          const response = xmlRequest.responseText;
          return cb(response);
        } else {
          throw new Error(`Request failed with status ${xmlRequest.status}`);
        }
      }
    };
    console.log(method, path);
    xmlRequest.open(method, `http://localhost:8000/${path}`, true);
    xmlRequest.setRequestHeader("Content-Type", "application/json");
    !!payload ? xmlRequest.send(JSON.stringify(payload)) : xmlRequest.send();
  }

  public async refreshDeviceList() {
    const callback = (response: string) => {
      const items: Array<Device> = JSON.parse(response);
      let ul = document.getElementById("listaDisp");
      ul.innerHTML = "";
      ul = buildItemList(items, ul);

      for (const item of items) {
        const checkbox = document.getElementById("cb_" + item.id);
        checkbox.addEventListener("click", this);

        const editButton = document.getElementById("edit_device_" + item.id);
        editButton.addEventListener("click", this);

        const deleteButton = document.getElementById(
          "delete_device_" + item.id
        );
        deleteButton.addEventListener("click", this);
      }
    };

    return this.backendRequest("GET", "device/all", callback);
  }

  private async updateDeviceStatus(element: HTMLElement) {
    let checkbox = <HTMLInputElement>element;
    this.backendRequest(
      "PUT",
      `device/${checkbox.getAttribute("nuevoAtt")}/state`,
      (response: string) => {
        console.log("Status Modificado");
      }
    );
  }

  public handleModalClose(modalId: string) {
    const modalElement = document.getElementById(modalId);
    const instance = M.Modal.getInstance(modalElement);
    instance.close();
  }

  private async createDevice(): Promise<void> {
    const iNombre = <HTMLInputElement>document.getElementById("iNombre");
    const iDescription = <HTMLInputElement>(
      document.getElementById("iDescription")
    );
    const iCreateType = <HTMLInputElement>(
      document.getElementById("iCreateType")
    );
    const pInfo = <HTMLInputElement>document.getElementById("pInfo");

    if (
      iNombre.value.length > 0 &&
      iDescription.value.length > 0 &&
      !isNaN(parseInt(iCreateType.value))
    ) {
      const device: Partial<Device> = {
        name: iNombre.value,
        description: iDescription.value,
        state: 1,
        type: parseInt(iCreateType.value),
      };
      this.backendRequest(
        "POST",
        "device",
        () => {
          console.log("Device Created");
        },
        { ...device }
      );
      iNombre.value = "";
      iDescription.value = "";
      iCreateType.value = "";
      pInfo.innerHTML = "";

      this.handleModalClose("modalCreateDevice");
      this.refreshDeviceList();
    } else {
      pInfo.innerHTML = "Entered data is incorrect";
      pInfo.className = "textError";
    }
  }

  private deleteDevice(element: HTMLElement) {
    this.backendRequest(
      "DELETE",
      `device/${element.getAttribute("dbId")}`,
      () => {
        console.log("Device Deleted");
      }
    );
    this.refreshDeviceList();
  }

  private handleEditDevice(element: HTMLElement) {
    const iEditName = <HTMLInputElement>document.getElementById("iEditName");
    const iEditDescription = <HTMLInputElement>(
      document.getElementById("iEditDescription")
    );
    const iEditType = <HTMLInputElement>document.getElementById("iEditType");
    const iEditModalInfo = document.getElementById("iEditModalInfo");

    const dbId = element.getAttribute("dbId");
    const originalName = document.getElementById(`item_name_${dbId}`).innerHTML;
    const origianlDescription = document.getElementById(
      `item_description_${dbId}`
    ).innerHTML;
    const originalType = document
      .getElementById(`item_type_${dbId}`)
      .getAttribute("typeId");

    iEditName.value = originalName;
    iEditDescription.value = origianlDescription;
    iEditType.value = originalType;
    iEditModalInfo.innerHTML = "";

    iEditName.setAttribute("dbId", `${dbId}`);
  }

  private handleSaveDevice() {
    const iEditName = <HTMLInputElement>document.getElementById("iEditName");
    const iEditDescription = <HTMLInputElement>(
      document.getElementById("iEditDescription")
    );
    const iEditType = <HTMLInputElement>document.getElementById("iEditType");
    const iEditModalInfo = document.getElementById("iEditModalInfo");

    if (
      !iEditName.value ||
      iEditName.value.length === 0 ||
      !iEditDescription.value ||
      iEditDescription.value.length === 0 ||
      isNaN(parseInt(iEditType.value))
    ) {
      iEditModalInfo.innerHTML = "Entered data is incorrect";
      iEditModalInfo.className = "textError";
      return;
    }

    const device: Partial<Device> = {
      id: parseInt(iEditName.getAttribute("dbId")),
      name: iEditName.value,
      description: iEditDescription.value,
      type: parseInt(iEditType.value),
    };

    this.backendRequest(
      "PUT",
      "device",
      () => {
        console.log("Device Edited");
      },
      device
    );
    this.handleModalClose("modalEditDevice");
    this.refreshDeviceList();
  }

  handleEvent(object: Event): void {
    let element = <HTMLElement>object.target;

    if (element.id.startsWith("cb_")) {
      this.updateDeviceStatus(element);
    } else if (element.id === "btnSaveDevice") {
      this.createDevice();
    } else if (element.id.startsWith("delete_device_")) {
      this.deleteDevice(element);
    } else if (element.id.startsWith("edit_device_")) {
      this.handleEditDevice(element);
    } else if (element.id === "btnEdit") {
      this.handleSaveDevice();
    }
  }
}

window.addEventListener("load", () => {
  const main1: Main = new Main();

  main1.refreshDeviceList();

  const elemsModal = document.querySelectorAll(".modal");
  const modalInstance = M.Modal.init(elemsModal, "");

  const buttonCreateDevice = document.getElementById("btnSaveDevice");
  buttonCreateDevice.addEventListener("click", (e) => {
    main1.handleEvent(e);
  });

  const buttonCancelDeviceCreation = document.getElementById(
    "btnCancelDeviceCreation"
  );
  buttonCancelDeviceCreation.addEventListener("click", (e) => {
    main1.handleModalClose("modalCreateDevice");
  });

  const buttonSaveDevice = document.getElementById("btnEdit");
  buttonSaveDevice.addEventListener("click", (e) => {
    main1.handleEvent(e);
  });

  const buttonCancelDeviceEdition = document.getElementById("btnCancelEdit");
  buttonCancelDeviceEdition.addEventListener("click", (e) => {
    main1.handleModalClose("modalEditDevice");
  });
});
