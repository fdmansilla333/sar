#include <SoftwareSerial.h>

SoftwareSerial bluetooth(10, 11); // RX, TX

void setup()
{
// Open serial communications and wait for port to open:
Serial.begin(9600);
bluetooth.begin(9600);
}

void loop() // run over and over
{
if ( bluetooth.available())
Serial.write( bluetooth.read());
if (Serial.available())
bluetooth.write(Serial.read());
}
