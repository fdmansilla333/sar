#include <SoftwareSerial.h>

SoftwareSerial bluetooth(10, 11); // RX, TX

void setup()
{
// Open serial communications and wait for port to open:
Serial.begin(9600);
bluetooth.begin(9600);
bluetooth.println ("Conectado");
}

void loop() // run over and over
{
  if ( bluetooth.available()){
    char valor=bluetooth.read();
    switch(valor){
        case '1': bluetooth.println("OK");
        break;
      }
    }
}
  

