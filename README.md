# CLOUDWATCH CLEANER

Este README contiene las diferentes formas de utilizar la librería cloudwatch cleaner

## Objetivos del cloudwatch cleaner
El objetivo es el de tener un componente permita realizar una depuración de los logs de cloudwatch antiguos

## Modo de uso
```
Usage: aws-cloudwatch-cleaner [options]

Options:
  -V, --version                output the version number
  -d, --delete                 elimina los logstream
  -f, --force                  No pide confirmación al eliminar
  -i, --init <logGroupName>    a partir de que log stream arrancar, es el último removido
  -l, --limit <cantidad>       limite de logs groups a evaluar
  -m --month <number>          Los meses a partir del cual eliminar los logs
  -p, --profile <profileName>  El perfil definido en las credenciales de AWS
  -r --region <region>         La region de AWS
  -s, --silent                 silencia los logs
  -h, --help                   display help for command
```

Estos son los comandos básicos

## Ejemplo de uso
Una vez instalado se lo puede ejecutar asi.

```
aws-cloudwatch-cleaner -p default -r us-east-1 -l 3
```

En este caso vamos a recorrer 3 log groups. El profile va a tomar el que tenemos por defecto en el directorio donde están alojadas nuestras credenciales de amazon.

Al finalizar nos va a mostrar un reporte de los logs que recorrió y cuantos se ignoraron.
Inmediatamente en el caso de que haya encontrado logs a borrar nos va a preguntar si queremos borrar.

## Recorrer los log por partes
Para recorrer los logs en varias ejecuciones se tiene que al recibir el reporte utilizar el valor de nextToken y tu utilizar el parámetro -i para especificar el elemento initial

### Ejemplo
```
aws-cloudwatch-cleaner -p default -r us-east-1 -l 3
```

Esto nos puede dar este reporte 

```
{
    removed: 1,
    ignored: 2,
    bytesRemoved: 12,
    nextToken: '/aws/lambda/proximoLog',
    total: 3
}
```

Deberiamos ejecutar
```
aws-cloudwatch-cleaner -p default -r us-east-1 -l 3 -i /aws/lambda/proximoLog
```

## Otro modo de uso
Esta librería disponibiliza un servicio el cual se puede importar si es instalado de forma local en un proyecto nodejs

```
const { RemoveLogsService } = require ('aws-cloudwatch-cleaner');

const config = {limit: 1, profile: default, region: us-east-1, month: 4, force: true}

new RemoveLogsService(config)
.run()
.then((reponse) => console.log(response));
```

En este caso vamos a obtener como resultado la eliminación de solamente 1 logGroup para aquellos logStreams que cumplan que son más antiguos que 4 meses respecto a la fecha actual.

**Nota importante**: se agrega el parámetro force para forzar que la eliminación de los logs.

Si se quiere hacer la confirmación se debe ejecutar la el método **removeLogs**
