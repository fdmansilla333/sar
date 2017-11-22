#include <SoftwareSerial.h>
/**
 * [sensor de llamas, Test de funcionamiento del sensor de llamas KY-026]
 */
int Led = 13 ;// Definición del pin para el led
int buttonpin = 3; // Interfaz del sensor de llamas, potenciometro (pin D0)
int analoog = A3; // Interfaz del sensor de llamas (pin A0)

int val ;// define numeric variables val
float sensor; //read analoog value

void setup ()
{
  pinMode (Led, OUTPUT) ;// Definimos a led como salida
  pinMode (buttonpin, INPUT) ;// Potenciometro como entrada
  pinMode (analoog, INPUT) ;// Señal de llamas como entrada
  Serial.begin(9600);
}

void loop ()
{
  sensor = analogRead(analoog);
  Serial.println(sensor);  // Muestra la temperatura

  val = digitalRead (buttonpin) ;// le asigno a val la lectura dada
    if (val == HIGH) // Cuando se detecte llama se enciende el led
  {
    digitalWrite (Led, HIGH);
  }
  else
  {
    digitalWrite (Led, LOW);
  }
  delay(1000);
}
