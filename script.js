const vehicleData = {
    "Audi": { "A1": "Pequeño", "A3": "Mediano", "A4": "Mediano", "A5": "Grande", "A6": "Grande", "A7": "Grande", "A8": "Extragrande", "Q2": "Mediano", "Q3": "Mediano", "Q5": "Grande", "Q7": "Grande", "Q8": "Extragrande", "TT": "Pequeño" },
    "BMW": { "1 Series": "Pequeño", "2 Series": "Pequeño", "3 Series": "Mediano", "4 Series": "Mediano", "5 Series": "Grande", "6 Series": "Grande", "7 Series": "Extragrande", "8 Series": "Extragrande", "X1": "Mediano", "X2": "Mediano", "X3": "Grande", "X4": "Grande", "X5": "Grande", "X6": "Extragrande", "X7": "Extragrande", "Z4": "Pequeño" },
    // Agrega el resto de las marcas y modelos aquí con sus respectivas categorías de tamaño
};

const precios = {
    "Limpieza completa": { "Pequeño": 40.90, "Mediano": 45.90, "Grande": 50.90, "Extragrande": 55.90 },
    "Limpieza en seco integral del vehículo": { "Pequeño": 85.00, "Mediano": 95.00, "Grande": 100.00, "Extragrande": 105.00 },
    "Limpieza Camu Detail": { "Pequeño": 130.00, "Mediano": 140.00, "Grande": 145.00, "Extragrande": 150.00 },
    "Sólo exterior": { "Pequeño": 25.00, "Mediano": 30.00, "Grande": 35.00, "Extragrande": 40.00 },
    "Sólo interior": { "Pequeño": 24.00, "Mediano": 29.00, "Grande": 34.00, "Extragrande": 39.00 }
};

document.addEventListener("DOMContentLoaded", function() {
    const brandSelect = document.getElementById("vehicle-brand");
    const modelSelect = document.getElementById("vehicle-model");
    const form = document.getElementById("subscription-form");
    const subscriptionOptions = document.getElementById("subscription-options");

    // Cargar las marcas en el select de marcas
    for (let brand in vehicleData) {
        let option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    }

    // Evento para cargar los modelos al seleccionar una marca
    brandSelect.addEventListener("change", function() {
        modelSelect.innerHTML = '<option value="">Selecciona una opción</option>';
        if (this.value) {
            let models = Object.keys(vehicleData[this.value]);
            models.forEach(function(model) {
                let option = document.createElement("option");
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        }
    });

    // Función para calcular el precio con descuento
    function calcularPrecio(basePrice, frecuencia, duracion) {
        let descuento = 0;
        if (duracion === 12) {
            if (frecuencia === 2) {
                descuento = 0.25;
            } else if (frecuencia === 3) {
                descuento = 0.13;
            } else if (frecuencia === 6) {
                descuento = 0.05;
            }
        }
        return basePrice * (1 - descuento);
    }

    // Evento al enviar el formulario
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const brand = brandSelect.value;
        const model = modelSelect.value;
        const size = vehicleData[brand][model];

        const frecuencias = [2, 3, 6, 12]; // Frecuencias en semanas
        const duraciones = [3, 6, 12]; // Duraciones en meses

        subscriptionOptions.innerHTML = '';
        frecuencias.forEach(frecuencia => {
            let div = document.createElement("div");
            div.className = "subscription-plan";
            div.innerHTML = `<h3>Cada ${frecuencia} semanas</h3>`;

            for (let categoria in precios) {
                let basePrice = precios[categoria][size];
                duraciones.forEach(duracion => {
                    let precio = calcularPrecio(basePrice, frecuencia, duracion);
                    let savings = (basePrice * frecuencia * (12 / frecuencia) * duracion / 12) - (precio * duracion / 12);
                    div.innerHTML += `
                        <div class="category">${categoria}</div>
                        <p class="price">${precio.toFixed(2)}€ por servicio (${duracion} meses)</p>
                        <p class="savings">Ahorras ${savings.toFixed(2)}€ al año</p>
                        <button>Suscribirme</button>
                    `;
                });
            }
            subscriptionOptions.appendChild(div);
        });

        subscriptionOptions.classList.add("visible");
    });
});
