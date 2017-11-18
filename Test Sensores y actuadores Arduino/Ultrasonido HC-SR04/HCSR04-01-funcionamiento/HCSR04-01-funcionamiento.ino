#include <Ultrasonic.h>

#define echo 7
#define trig 6

Ultrasonic ultrasonido(trig, echo);
void configuracion(){

 pinMode(echo, INPUT);
 pinMode(trig, OUTPUT);

}
void setup() {
 
  Serial.begin(9600);
  Serial.println("SCSR04...");
  configuracion();
}


void testUltrasonido(){

   int distancia= ultrasonido.Ranging(CM);
   Serial.println("Distancia:"+String(distancia)+" CM");
   delay(1000); 

  
  
}
void loop() {
   testUltrasonido();
}
