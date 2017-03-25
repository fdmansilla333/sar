/*
Comunicacion bluetooth
Esta prueba determina la velocidad del Bluetooth al enviar caracteres
desde una notebook y smartphone utilizando el BT en ambos casos.
Con un Serial 9600, y un BT 9600 baudios.
La velocidad alcanzada fue de 1,17kb.
Se propone realizar otra prueba aumentando los baudios a 115200bps, donde se debería llegar a
14.0625 Kb
Dada esta prueba se obtiene que la máxima velocidad de 14kb, tardaría 21 sg en transmitir una imagen de 300kb.
Máxima velocidad del módulo (fuera de norma=C) 1382400 bps = 168,75 Kb/s
El módulo HC.06 puede alcanzar una velocidad de 1586 kb/s
Link de información: http://www.prometec.net/bt-hc05/
Link calculator: http://www.calculator.org/property.aspx?name=data+rate
 */
#include <SoftwareSerial.h>

SoftwareSerial bluetooth(10, 11); // RX, TX
long cont;
long tiempoini;
/**
 * [setup description]
 */
void setup()
{

Serial.begin(9600);
bluetooth.begin(9600);
cont = 0;
}

int paso = 0;
long segundos=0;
long tiempofin;
unsigned long antes=0;
unsigned long despues=0;

void loop()
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
  /
}
