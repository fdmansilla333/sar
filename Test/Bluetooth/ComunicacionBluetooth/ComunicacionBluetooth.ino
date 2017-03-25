#include <SoftwareSerial.h>

SoftwareSerial bluetooth(10, 11); // RX, TX
long cont;
long tiempoini;

void setup()
{
// Open serial communications and wait for port to open:
Serial.begin(9600);
bluetooth.begin(9600);
cont = 0;
}

int paso = 0;
long segundos=0;
long tiempofin;
unsigned long antes=0;
unsigned long despues=0;

void loop() // run over and over
{
  tiempoini = millis();
  while(segundos < 1.0){
    antes=millis();
    if ( bluetooth.available()){
      bluetooth.read();
      despues = millis() - antes;
      cont++;
      paso=1;
    }
    tiempofin = millis()- tiempoini;
    segundos = tiempofin/1000;
  }
  if (paso != 0){
  Serial.println("Bytes leidos:"+ String(cont)+" tiempo antesDespues micros:"+String(despues));
  paso =0;
  }
  segundos =0;
  cont=0;
  //Serial.write( bluetooth.read());
  //if (Serial.available())
  //  bluetooth.write(Serial.read());
}
