




let salir = true;

//     true
while(salir){
    let menuApp = prompt('************Bienvenido a la videotienda*********** \n01 - Consultar Peli \n02 - Alquilar Peli \n03 - Devolver Peli \n04 - Salir de la app');
    
    if(menuApp === "4"){
        salir = false;
    }else{
        switch(menuApp){
            case "1":
                alert('************Peliculas disponibles*********** \n01 - Señor de los anillos \n02 - Arma desnuda \n03 - El vengador \n04 - Avatar');
                break;  
                 
            case "2":
                var AlquilerPeli = prompt('************Alquiler de peliculas*********** \nDigite el titulo de la pelicula');
    
                var newCliente = prompt('Digite su nombre');
                break;
    
            case "3":
                let clientEntrega = prompt('Digite su nombre');
    
                console.log(newCliente, clientEntrega)
                if(newCliente === clientEntrega){
                    alert('Pelicula :' + AlquilerPeli);
                }
                break;
    
            default:
                alert("Esta opcion no es valido");
            break;
        }
    
    }
}

