int motor1in1=8;
int motor1in2=9;
int motor2in3=10;
int motor2in4=11;

int motor3in3=7;
int motor3in4=6;
int motor4in1=5;
int motor4in2=4;

void setup() {
 pinMode(motor1in1, HIGH);
 pinMode(motor1in2, HIGH);
 pinMode(motor2in3, HIGH);
 pinMode(motor2in4, HIGH);
 pinMode(motor3in3, HIGH);
 pinMode(motor3in4, HIGH);
 pinMode(motor4in1, HIGH);
 pinMode(motor4in2, HIGH);

 Serial.begin(9600);
 
}
void testMotor(int puertoA, int puertoB, int tiempo, String motor){
  Serial.println("Motor N° "+String(motor)+" Marcha 1-0");
  digitalWrite(puertoA, HIGH);
  digitalWrite(puertoB,LOW);
  delay(tiempo);
  Serial.println("Apagado Motor N° "+String(motor)+" Marcha 1-0");
  digitalWrite(puertoA, LOW);
  digitalWrite(puertoB,LOW);
  delay(tiempo); 
  Serial.println("Motor N° "+String(motor));
  digitalWrite(puertoA, LOW);
  digitalWrite(puertoB,HIGH);
  delay(tiempo);
  Serial.println("Apagado Motor N° "+String(motor));
  digitalWrite(puertoA, LOW);
  digitalWrite(puertoB,LOW);
  delay(tiempo);

}

void loop() {

  testMotor(motor1in1, motor1in2, 1000, "motor1");
  testMotor(motor2in3, motor2in4, 1000, "motor2");
  testMotor(motor3in3, motor3in4, 1000, "motor3");
  testMotor(motor4in1, motor4in2, 1000, "motor4");

}
