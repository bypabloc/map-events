# Map Events - ByPabloC

## Demo de esta app:

Ver [Map Events deployed in Netlify.app](https://bypabloc-map-events.netlify.app/).

## Pasos para instalar esta app en local:

### Clonar el repositorio
```
git clone https://github.com/bypabloc/map-events.git
```

### Dirigirse a la carpeta
```
cd map-events
```

### Crear el archivo ".env"
```
touch .env
```

### Editar el archivo ".env"
```
sudo nano .env
```

### Indicar en el contenido del mismo la ubicación de la API a consumir. Vease [Guía para Map-Events-API](https://bypabloc-map-events-api.herokuapp.com/)
```
VUE_APP_BASE_URL='http://localhost:3000'
```

### Instalar los paquetes necesarios
```
npm install
```

### Iniciar la app con:
```
npm run serve
```

### Ingrese en su navegador en la URL indicada en consola, usualmente es algo como esto: 
```
http://localhost:8080/
```


