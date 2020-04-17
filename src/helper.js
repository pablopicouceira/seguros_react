export function getYearDifference(year) {
    return new Date().getFullYear() - year
};

// Calcular el total a pagar según el origen

export function calculaSegunOrigen(origen) {
    let incremento;

    switch (origen) {
        case "europeo":
            incremento = 1.30;
            break;
        case "americano":
            incremento = 1.15;
            break;
        case "asiatico":
            incremento = 1.05;
            break;
        default:
            break
    }

    return incremento;
};

// Calcular el total según el plan

export function calcularSegunPlan(plan) {
    return (plan === "basico") ? 1.20 : 1.50;
}