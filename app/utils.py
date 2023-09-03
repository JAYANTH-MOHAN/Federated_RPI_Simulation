from datetime import datetime,date
import pytz


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

def getISTTime():
    IST = pytz.timezone('Asia/Kolkata')
    return datetime.now(IST).strftime("%m/%d/%Y, %H:%M:%S")
  
