import Adafruit_DHT
import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)

def get_temp_hum():
    """
    Returns temp(*C) and Humidity
    """
    DHT_SENSOR = Adafruit_DHT.DHT11
    DHT_PIN = 4
    humidity, temperature = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
    return temperature,humidity

def get_moisture_state():
    """
    Returns a Boolean Value if water present
    or not. Threshold can be set in hardware.
    
    """
    channel=21
    GPIO.setup(channel, GPIO.IN)
    return GPIO.input(channel)

