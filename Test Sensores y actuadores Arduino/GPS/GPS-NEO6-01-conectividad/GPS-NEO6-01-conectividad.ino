/**
 * Esta prueba, se basa en obtener una trama para luego formatearla.
 * Para ello se hace uso de la librería TinyGPS, para acceder a la trama de datos.
 * La prueba no resultó satisfactorio en cuanto a la conexión
 * La señal gps, se obtiene pero con errores.
 * Hay que efectuar una nueva prueba desde un ambiente despejado.
 *
 * simple_test que ofrece la librería funciona marcando algunos errores de trama.
 * [gps description]
 * @param  [rx] [pin recepción]
 * @param  [tx] [pin transmisión]
 * @return        [SoftwareSerial]
 */
#include <SoftwareSerial.h>

SoftwareSerial gps(4,3);

char dato=' ';

void setup()
{
 Serial.begin(9600);
 gps.begin(9600);
}


void loop()
{
  if(gps.available())
  {
    dato=gps.read();
    Serial.print(dato);
  }
}
