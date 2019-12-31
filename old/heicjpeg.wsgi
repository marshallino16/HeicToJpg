#!/usr/bin/python
import sys
import logging
import monitor 

monitor.start(interval=1.0)
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/heicjpeg/")

from heicjpeg import app as application
application.secret_key = 'azerty'
