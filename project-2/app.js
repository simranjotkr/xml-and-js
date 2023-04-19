const key = `Kx3RMe98RRH9Hcp0wHfdng`;

const getCarbonEmission = async (type, du, distance,vehicle_model_id) => {
    const data = await fetch(`https://www.carboninterface.com/api/v1/estimates`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + key
        },
        body: JSON.stringify({
            type: type,
            distance_unit: du,
            distance_value: distance,
            vehicle_model_id: vehicle_model_id
        })
    })

    const result = await data.json();
    return result;
}

const calcCarbonEmission = async (e) => {
    e.preventDefault();
    const vehicle_model_id = document.getElementById("vehicle-model-id").value;
    const type = document.getElementById("type").value;
    const distance = document.getElementById("distance").value;
    const du = document.querySelector('input[name = "du"]:checked').value;
    const { data: { attributes } } = await getCarbonEmission(type, du, distance, vehicle_model_id).then(result => result);
    document.getElementById("result-data").innerHTML = `
        <div class="vehicle-desc">
            <p><u>Vehicle Make</u>: ${attributes.vehicle_make} </p>
            <p><u>Vehicle Model</u>: ${attributes.vehicle_model}  </p>
            <p><u>Vehicle Year</u>: ${attributes.vehicle_year}</p>
        </div>
        <div class="vehicle-desc">
            <p><u>Distance Unit</u>: ${attributes.distance_unit} </p>
            <p><u>Distance Value</u>: ${attributes.distance_value}  </p>
            <p><u>Estimated At</u>: ${attributes.estimated_at}</p>
        </div>
        <div class="vehicle-desc">
        <p><u>Carbon(gms)</u>: ${attributes.carbon_g} </p>
        <p><u>Carbon(Kgs)</u>: ${attributes.carbon_kg}  </p>
        <p><u>Carbon(Pounds)</u>: ${attributes.carbon_lb}</p>
    </div>
    `
}