#include <SoftwareSerial.h>
/**
 * [bluetooth Test de funcionamiento del módulo BT HC05]
 * @param  [RX] [Recepción de datos pin]
 * @param  [TX] [Pin de transmisión de datos]
 * @return        [Objeto SoftwareSerial]
 */
SoftwareSerial bluetooth(10, 11); // RX, TX

void setup()
{
// Open serial communications and wait for port to open:
Serial.begin(9600);
bluetooth.begin(9600);
}

/**
 * [loop]
 * Verifica si el BT está disponible, y de estarlo, lee del Serial y escribe lo que lee del BT.
 * Y si existe contenido en el Serial, lo envía al BT
 * BT <--> SERIAL
 */
void loop() // run over and over
{
if ( bluetooth.available())
Serial.write( bluetooth.read());
if (Serial.available())
bluetooth.write(Serial.read());
}
