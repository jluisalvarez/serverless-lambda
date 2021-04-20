console.log('Cargando Función Lambda Hello World');
 
exports.handler = async (event) => {
    
    let saludo = "Hello";
    let persona = 'Somebody';
    let lugar = 'World';
    let dia = '';
    let mes = 'Month';
    let responseCode = 200;
    console.log("request: " + JSON.stringify(event));
    
    if (event.queryStringParameters && event.queryStringParameters.saludo) {
        console.log("Recibido Saludo: " + event.queryStringParameters.saludo);
        saludo = event.queryStringParameters.saludo;
    }
    
    if (event.queryStringParameters && event.queryStringParameters.persona) {
        console.log("Recibido Persona: " + event.queryStringParameters.persona);
        persona = event.queryStringParameters.persona;
    }
    
    if (event.queryStringParameters && event.queryStringParameters.lugar) {
        console.log("Recibido Lugar: " + event.queryStringParameters.lugar);
        lugar = event.queryStringParameters.lugar;
    }
    
    if (event.headers && event.headers['dia']) {
        console.log("Recibido Dia: " + event.headers.dia);
        dia = event.headers.dia;
    }
    
    if (event.body) {
        let body = JSON.parse(event.body)
        if (body.mes) 
            mes = body.mes;
    }
 
    let greeting = `${saludo} ${persona} of ${lugar}.`;
    if (dia) greeting += ` Happy ${dia} of ${mes}!`;

    let responseBody = {
        message: greeting,
        //input: event
    };
    
    let response = {
        statusCode: responseCode,
        headers: {
            "x-custom-header" : "my custom header value"
        },
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response))
    return response;
};