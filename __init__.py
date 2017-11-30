from flask import Flask, render_template, request, Response, url_for, send_from_directory, send_file
from flask_cors import CORS

from os.path import basename

import os
import subprocess
import sys
import base64
import re
import threading
import time

#sys.path.append('/home/heiftojpg/')

#######################################
#              FLASK                  #
#######################################

app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['TEMPLATES_AUTO_RELOAD'] = True
CORS(app)


@app.before_first_request
def startup():
    print("startedup")


@app.route('/')
def index():
    url_style_normalize = url_for('static', filename='css/normalize.css')
    url_style_skeleton = url_for('static', filename='css/skeleton.css')
    url_style = url_for('static', filename='css/style.css')
    url_script = url_for('static', filename='js/script.js')
    url_favicon = url_for('static', filename='img/logo_large.png')

    return render_template('index.html',
                           style=url_style,
                           script=url_script,
                           style_normalize=url_style_normalize,
                           style_skeleton=url_style_skeleton,
                           favicon=url_favicon)


@app.route('/upload', methods=['POST'])
def upload():
    path_to_upload = os.path.abspath(os.path.dirname(__file__)) + '/uploads'
    path_converted = os.path.abspath(os.path.dirname(__file__)) + '/static/converted'

    f = request.files.get('photo')
    f.save(os.path.join(path_to_upload, f.filename))

    final_uploaded_filepath = os.path.join(path_to_upload, f.filename)
    final_uploaded_filename = os.path.splitext(basename(final_uploaded_filepath))[0]
    final_converted_filename = os.path.join(path_converted, final_uploaded_filename)

    bash_command = "tifig -v " + final_uploaded_filepath + " -o " + final_converted_filename + ".jpg"
    process = subprocess.Popen(bash_command.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()

    public_url = final_uploaded_filename + '.jpg'

    if error is not None:
        return "Error converting file :(", 500
    else:
        return public_url, 200


if __name__ == '__main__':
    app.run(host='138.68.187.152')
#    app.run(host='138.68.187.152', port=80)
