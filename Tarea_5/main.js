function realizarOperaciones() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultados = document.getElementById("resultados");

    resultados.innerHTML = "";

    if (isNaN(num1) || isNaN(num2)) {
        resultados.innerHTML = "Por favor, ingresa dos números válidos.";
        return;
    }

    for (let i = 1; i <= 5; i++) {
        let resultado;
        let mensaje = "";

        switch (i) {
            case 1:
                resultado = num1 + num2;
                mensaje = `- Suma: ${num1} + ${num2} = ${resultado}`;
            break;
            case 2:
                resultado = num1 - num2;
                mensaje = `- Resta: ${num1} - ${num2} = ${resultado}`;
            break;
            case 3:
                resultado = num1 * num2;
                mensaje = `- Multiplicación: ${num1} * ${num2} = ${resultado}`;
            break;
            case 4:
                if (num2 === 0) {
                    mensaje = "- División: No se puede dividir entre 0.";
                } else {
                    resultado = num1 / num2;
                    mensaje = `- División: ${num1} / ${num2} = ${resultado}`;
                }
                break;
            case 5:
                if (num2 === 0) {
                    mensaje = "- Módulo: No se puede hacer módulo con 0.";
                } else {
                    resultado = num1 % num2;
                    mensaje = `- Módulo: ${num1} % ${num2} = ${resultado}`;
                }
                break;
        }

        const p = document.createElement("p");
        p.textContent = mensaje;
        resultados.appendChild(p);
      }
    }
