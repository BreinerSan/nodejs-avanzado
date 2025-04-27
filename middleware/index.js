function middlewares(req, res, middlewares){
    let index = 0;

    const next = () => {
        if(index < middlewares.length){
            const middleware = middlewares[index++];
            middleware(req, res, next);
        }
    }

    next();
}

const middleware1 = (req, res, next) => {
    console.log('Middleware 1: Autenticando la petición');
    next();
}

const middleware2 = (req, res, next) => {
    console.log('Middleware 2: Procesamiento de la petición');
    next();
}

const middleware3 = (req, res, next) => {
    console.log('Middleware 3: Finalizando la petición');
    if(req.user){
        console.log(`Middleware 3: Bienvenido ${req.user.name}`);
        next();
    }else{
        console.log('Finaliza la ejecucion del middleware 3 y no ejecuta la cuatro');
    }

}

const middleware4 = (req, res, next) => {
    console.log('Middleware 4: Peticion adicional');
    next();
}

const res = {};
const req = { user: { name: 'Pepe' } };

middlewares(req, res, [middleware1, middleware2, middleware3, middleware4]);
