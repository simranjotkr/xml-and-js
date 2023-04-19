const key = `Kx3RMe98RRH9Hcp0wHfdng`;

const loadData = async () => {
    const data = await fetch(`https://www.carboninterface.com/api/v1/vehicle_makes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + key
        }
    })

    const result = await data.json();
    let html = result.map(({data: {id, attributes}}) => `<option id=${id} >${attributes.name}</option>`);
    document.getElementById("select-make").innerHTML = `<option>--Select Vehicle Make--</option>` + html.join(``);
}

loadData();

const selectedVehicle = async() => {
    const selectedOption = document.querySelector("#select-make option:checked");
    const id = selectedOption.id;
    const data = await getModel(id);
    const html = data.map(({data: {id, attributes}}) => {
        return `<tr>
            <td>${attributes.name}</td>
            <td>${attributes.vehicle_make}</td>
            <td>${attributes.year}</td>
            <td>${id}</td>
        </tr>`
    })
    document.getElementById("table").insertAdjacentHTML('beforeend', html.join(``));
}

const getModel = async (make_id) => {
    const data = await fetch(`https://www.carboninterface.com/api/v1/vehicle_makes/${make_id}/vehicle_models`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + key
        }
    })

    const result = await data.json();
    return result;
}