const key = `Kx3RMe98RRH9Hcp0wHfdng`;

const getTransportEmission = async (type, weight, wu, dist, du) => {
    const data = await fetch(`https://www.carboninterface.com/api/v1/estimates`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + key
        },
        body: JSON.stringify({
            type: "shipping",
            weight_value: weight,
            weight_unit: wu,
            distance_value: dist,
            distance_unit: du,
            transport_method: type
        })
    })

    const result = await data.json();
    return result;
}


const calcCarbonEmission = async (e) => {
    e.preventDefault();
    const weight = document.getElementById("weight").value;
    const type = document.getElementById("type").value;
    const wu = document.querySelector('input[name = "wu"]:checked').value;
    const dist = document.getElementById("distance").value;
    const du = document.querySelector('input[name = "du"]:checked').value;
    const { data: { attributes } } = await getTransportEmission(type, weight, wu, dist, du).then(result => result);
    document.getElementById("result-data").innerHTML = `
        <div class="vehicle-desc">
            <p><u>Distance:</u>: ${attributes.distance_value} </p>
            <p><u>Unit:</u>: ${attributes.distance_unit}  </p>
            <p><u>Weight:</u>: ${attributes.weight_value}</p>
            <p><u>Unit:</u>: ${attributes.weight_unit}</p>
        </div>
        <div class="vehicle-desc">
            <p><u>Transport Method:</u>: ${attributes.transport_method} </p>
            <p><u>Estimated At:</u>: ${attributes.estimated_at}</p>
        </div>
        <div class="vehicle-desc">
        <p><u>Carbon(gms)</u>: ${attributes.carbon_g} </p>
        <p><u>Carbon(Kgs)</u>: ${attributes.carbon_kg}  </p>
        <p><u>Carbon(Pounds)</u>: ${attributes.carbon_lb}</p>
    </div>
    `
}