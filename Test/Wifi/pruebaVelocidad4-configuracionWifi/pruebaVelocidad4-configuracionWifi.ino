#include <SoftwareSerial.h>
/**
 * Configuramos el BT a 50000000 y conseguimos una velocidad de 54kb/sg
 */
SoftwareSerial ESP(3, 2); // RX | TX
/*
Enviar comando al esp8266 y verificar la respuesta del módulo, todo esto dentro del tiempo timeout
*/
void sendData(String comando, const int timeout)
{
 long int time = millis(); // medir el tiempo actual para verificar timeout
 
 ESP.print(comando); // enviar el comando al ESP8266
 
 while( (time+timeout) > millis()) //mientras no haya timeout
 {
 while(ESP.available()) //mientras haya datos por leer
 { 
 // Leer los datos disponibles
 char c = ESP.read(); // leer el siguiente caracter
 Serial.print(c);
 }
 } 
 return;
}
//Funcion para llenar un buffer con 1024 elementos
void armarBuffer(char buf[], int inicio, int fin){
  for(int i=inicio; i<=fin; i++){
    buf[i]='1';
  }
  
}
char frame[1024]; //En 2048 se queda con problemas Arduino UNO, por quedarse sin espacio
//Se configura el serial para imprimir las opciones
//TODO hay que testear esto con el ESP, a otra velocidad
void setup()
  {  Serial.begin(9600);
     Serial.println("Las opciones son: 1 para comenzar y 2 para finalizar");
     ESP.begin(5000000);
     sendData("AT+CIPMUX=1\r\n",1000); // configurar para multiples conexiones
     sendData("AT+CIPSERVER=1,80\r\n",1000);         // servidor en el puerto 80
    
     
     armarBuffer(frame,0,1023);
  }

//Este toma de la entrada estandar un 1 para comenzar la prueba de transmitir un buffer de 1kb, en 1 sg, por medio del wifi.
//De esta forma, se puede terminar la máxima velocidad reduciendo el timeout.
void loop()
  {  
   if(Serial.available()){
      
      //Si esta disponible leo del buffer
      char opc = Serial.read();
      if(opc == '1'){
        bool detener=false;
        while(!detener){
          //TODO Ver de ir reduciendo el timeout, de tal forma de estresar el enlace.
          long tiempoAnterior=millis();
          sendData("AT+CIPSEND=0,2047\r\n",0);
          ESP.print(frame);
          ESP.print(frame);
          long tiempoActual = millis()-tiempoAnterior;
          Serial.println("---------El tiempo de transmisión es:"+String(2000/tiempoActual)+  "KB/sg");
          opc = Serial.read();
          if (opc=='2'){
            detener = true;
          }
        }
      }
      }
      if(ESP.available()){ //Hay algo en el buffer del wifi
        while(ESP.available()){
          char c= ESP.read();
          Serial.print(c);
      }
      }
    }
   
   
