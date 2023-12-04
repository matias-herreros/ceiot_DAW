import { Device } from "../interfaces/device.interface";

export const buildItemList = (
  items: Device[],
  ul: HTMLElement
): HTMLElement => {
  for (let item of items) {
    let itemList = ` 
      <li class="collection-item avatar">
        <img src="./static/images/lightbulb.png" alt="" class="circle">
        <span class="title" id="item_name_${item.id}">${item.name}</span>
        <p id="item_description_${item.id}">${item.description}</p>
        <div class="secondary-content col l3" >
            <a href="#!" class="col l8">
              <div class="switch">
                  <label>
                    Off
                    <input type="checkbox" nuevoAtt="${item.id}" id="cb_${
      item.id
    }" ${!!item.state ? "checked" : null}>
                    <span class="lever"></span>
                    On
                  </label>
              </div>
            </a>
            <a class="col l2 waves-effect waves-light btn modal-trigger"
              href="#modalEditDevice">
                <i class="material-icons" id="edit_device_${item.id}" dbId="${
      item.id
    }">edit</i>
            </a>
            <a class="col l2 waves-effect waves-light btn "
            href="#!">
              <i class="material-icons" id="delete_device_${item.id}" dbId="${
      item.id
    }">delete</i>
          </a>
        </div>
      </li>`;

    ul.innerHTML += itemList;
  }
  return ul;
};
