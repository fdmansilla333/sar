int pin_mq = 2;

void setup() { 
  Serial.begin(9600);
  pinMode(pin_mq, INPUT);
}


void loop() {
  
  boolean mq_estado = digitalRead(pin_mq);//Leemos el sensor
  if(mq_estado) //si la salida del sensor es 1
  {
    Serial.println("Sin presencia de monoxido de carbono");
  }
  else //si la salida del sensor es 0
  {
    Serial.println("Monoxido de carbono detectado");
  }
  delay(100); 
}
