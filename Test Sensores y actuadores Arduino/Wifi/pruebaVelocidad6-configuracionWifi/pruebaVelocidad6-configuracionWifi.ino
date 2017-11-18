#include <SoftwareSerial.h>
#define MAX 128
#define VELORIGINAL 115200
#define VELNUEVA 19200
//velocidad maxima 4608000
/**
 * Configuramos el BT a 4500000 y conseguimos una velocidad de 55 KB/sg
 */
SoftwareSerial ESP(3,2); // RX | TX
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

char frame[MAX]; //En 2048 se queda con problemas Arduino UNO, por quedarse sin espacio
//Se configura el serial para imprimir las opciones
//con un buffer de 512, y misma velo va a 20kb/sg
//con un buffer de 256, misma velo va a 25-38kb/sg
//Con un buffer de 128, la misma velo va a 45-66kb/sg
//TODO hay que testear esto con el ESP, a otra velocidad


//Probando sin CIOMUX=0, CIPMODE=1, CIPSERVER=0, TCP rafagas de 20ms buffer 2k
void setup()
  {  Serial.begin(9600);
     Serial.println("Las opciones son: 1 para comenzar y 2 para finalizar");
     ESP.begin(115200);
    
      sendData("AT+CIOBAUD="+String(VELNUEVA)+"\r\n", 3000);
    Serial.println("-------FIN CONFIG VELNUEVA------");
     ESP.begin(VELNUEVA);
    
     sendData("AT+CIPSTART='UDP','192.168.4.2',56011",1000);
     Serial.println("-------conexion UDP------");
     sendData("AT+CIPSTATUS",1000);
     Serial.println("-------STATUS------");
     armarBuffer(frame,0,MAX-1);
  }

//Este toma de la entrada estandar un 1 para comenzar la prueba de transmitir un buffer de 1kb, en 1 sg, por medio del wifi.
//De esta forma, se puede terminar la máxima velocidad reduciendo el timeout.
long minimo=0;
long maximo=0;
long paquetesEnviados;
long tiempoInicio;
long tiempoFinal;
bool primero=true;
void loop()
  {  
   if(Serial.available()){
      
      //Si esta disponible leo del buffer
      char opc = Serial.read();
      if(opc == '1'){
        bool detener=false;
        tiempoInicio=millis();
        paquetesEnviados=0;
        while(!detener){
          
          long tiempoAnterior=millis();
          sendData("AT+CIPSEND="+String(MAX)+"\r\n",0);
          ESP.print(frame);
          paquetesEnviados++;
          long tiempoActual = millis()-tiempoAnterior;
          Serial.println("---------El tiempo de transmisión es:"+String(((1000/tiempoActual)*MAX)/1024)+  "KB/sg");
          if (primero){
            primero=false;
            minimo=tiempoActual;
            maximo=tiempoActual;
          }else{
            if (minimo>tiempoActual){
              minimo= tiempoActual;
            }
            if(maximo< tiempoActual){
              maximo= tiempoActual;
            }
          }
          opc = Serial.read();
          if (opc=='2'){
            detener = true;
            tiempoFinal = millis();
            primero=true;
            Serial.println("Rango de velocidad medido con Buffer="+String(MAX)+"KB Tiempo minimo entre paquetes:"+String(minimo)+"ms<->Tiempo maximo entre paquetes:"+String(maximo)+"ms");
            Serial.println("Tiempo total de prueba:"+String((tiempoFinal-tiempoInicio)/1000)+" segundos");
            Serial.println("Paquetes enviados"+String(paquetesEnviados));
            float paqTiem=paquetesEnviados/((tiempoFinal-tiempoInicio)/1000);
            Serial.println("Media:"+String(paqTiem)+"paq/sg");
            Serial.println("Transf:"+String((paqTiem*MAX)/1024)+"KB/SG");
              
              sendData("AT+CIOBAUD="+String(VELORIGINAL)+"\r\n", 3000);
            
              ESP.begin(VELORIGINAL);
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
   
   
