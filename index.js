const url = "http://localhost:3000/data";
const ViewAll = document.getElementById("ViewAll");
const Card = document.getElementById("card");
const Type = document.getElementById("Tselect");
const Ammo = document.getElementById("Ammoselect");
const detail = document.getElementById("detail");
const Edit = document.getElementById("In-content");

// read data
const TypeList = ["DMR", "SR", "AR", "SMG", "Shoutgun", "Pistol"];

TypeList.forEach((element) => {
  const Options = document.createElement("option");
  Options.textContent = element;
  Options.value = element;
  Type.appendChild(Options);
});
const AmmoList = [
  "7.62mm",
  "5.56mm",
  "300 Magnum",
  "9mm",
  "0.45 ACP",
  "12Gauge",
];
AmmoList.forEach((element) => {
  const Options = document.createElement("option");
  Options.textContent = element;
  Options.value = element;
  Ammo.appendChild(Options);
});

function fetchData() {
  Card.innerHTML = "Loading....";

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Not Responding");
      }
      return res.json();
    })
    .then((data) => {
      Card.innerHTML = "";

      data.forEach((item) => {
        const node = document.createElement("div");
        node.innerHTML = `
        <div class="card-content">
          <h3>${item.name}</h3>
          <img src="${item.img}" width="200px" height="200px" />
          <h4>${item.type}</h4>
          <p>${item.ammo}</p>
          <div>
            <button onclick="EditData(${item.id})">Edit</button>
            <button onclick="showDetail(${item.id})">Detail</button>
            <button onclick="DeleteData(${item.id})" >Delete</button>
          </div>
        </div>
        `;
        Card.appendChild(node);
      });
    })
    .catch((err) => {
      console.error("Error".err);
      Card.innerHTML = "Error Corrupted data";
    });
}

function PostData(event) {
  event.preventDefault();
  const inputName = document.getElementById("Nama_input");
  const inputType = document.getElementById("Tselect");
  const inputAmmo = document.getElementById("Ammoselect");
  const inputIMG = document.getElementById("Img_input");
  const inputDesk = document.getElementById("desk_input");

  if (
    inputName.value &&
    inputType.value &&
    inputAmmo.value &&
    inputIMG.value &&
    inputDesk.value
  ) {
    const data = {
      name: inputName.value,
      type: inputType.value,
      ammo: inputAmmo.value,
      img: inputIMG.value,
      desk: inputDesk.value,
    };

    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resdata) => {
        console.log(resdata);
        alert("Data Berhasil Ditambahkan");
      })
      .catch((err) => {
        console.error("Error".err);
      });
  } else {
    alert("Harap Semua Form Telah Diisi");
  }
}
function DeleteData(id) {
  fetch(url + `/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      confirm("Apakah Anda yakin untuk menghapus?");
      if (!res.ok) {
        throw Error("Data tidak Terhapus,Silahkan cek koneksi anda!!");
      }
      return res.json();
    })
    .then(() => {
      fetchData();
      alert("Data Berhasil Dihapus");
    })
    .catch((err) => {
      console.error("Error", err);
    });
}
// show detail
function showDetail(id) {
  fetch(url + `/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw Error("Not Responding");
      }
      return res.json();
    })
    .then((data) => {
      detail.innerHTML = "";

      const node = document.createElement("div");
      node.innerHTML = `
      <div class="detail-content">
        <button onclick="DeleteDetail()" >X</button>
        <h2 id="Name_detail">${data.name}</h2>
        <h3 id="Type_detail">${data.type}</h3>
        <img
          id="img_detail"
          src="${data.img}"
          alt=""
          srcset=""
        />
        <h3 id="ammo_detail">${data.ammo}</h3>
        <div class="desk" id="desk_detail"> ${data.desk}</div>
    </div>
        `;
      detail.appendChild(node);
    })
    .catch((err) => {
      console.error("Error", err);
      detail.innerHTML = "Error Corrupted data";
    });
}
function DeleteDetail() {
  detail.innerHTML = "";
}

// Functions Edit Data

function EditData(id) {
  const EditName = document.getElementById("Nama_input");
  const EditType = document.getElementById("Tselect");
  const EditAmmo = document.getElementById("Ammoselect");
  const EditIMG = document.getElementById("Img_input");
  const EditDesk = document.getElementById("desk_input");
  fetch(url + "/" + id)
    .then((res) => {
      if (!res.ok) {
        throw Error("Not responsding");
      }
      return res.json();
    })
    .then((data) => {
      EditName.value = data.name;
      EditType.value = data.type;
      EditAmmo.value = data.ammo;
      EditIMG.value = data.img;
      EditDesk.value = data.desk;
      console.log(data.ammo);
    })
    .catch((err) => {
      console.error("Error", err);
      // detail.innerHTML = "Error pengambilan data data";
    });
}

// Update Data
function UpdateData(event, id) {
  event.preventDefault();
  const EditName = document.getElementById("Nama_input");
  const EditType = document.getElementById("Tselect");
  const EditAmmo = document.getElementById("Ammoselect");
  const EditIMG = document.getElementById("Img_input");
  const editForm = document.getElementById("In-content");
  const EditDesk = document.getElementById("desk_input");

  if (
    EditName.value &&
    EditType.value &&
    EditAmmo.value &&
    EditIMG.value &&
    EditDesk.value
  ) {
    const data = {
      name: EditName.value,
      type: EditType.value,
      ammo: EditAmmo.value,
      img: EditIMG.value,
      desk: EditDesk.value,
    };
    fetch(url + "/" + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      // console.log(data);
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network Not Responsding");
        }
        // console.log(res);
        return res.json();
      })
      .then((resdata) => {
        console.log(resdata);
        alert("Data Berhasil DiUpdate");

        fetchData();
      })
      .catch((err) => {
        console.error("Error", err);
        // console.log(err);
      });
  } else {
    alert("Harap Semua Form Diisi Dahulu");
  }
}
