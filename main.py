from flask import Flask, render_template, request, url_for, jsonify
from flask_cors import CORS
from google.cloud import storage

from os.path import basename

from PIL import Image, ExifTags

import os
import subprocess


storage_client = storage.Client()
bucket_uploads = storage_client.get_bucket('marsha-prd-uploads')
bucket_conversions = storage_client.get_bucket('marsha-prd-converted')

app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['TEMPLATES_AUTO_RELOAD'] = True
# app.config["SERVER_NAME"] = "heictojpg.site"


CORS(app)


#@app.route('/', defaults={'path': ''})
#@app.route('/<path:path>')
#def catch_all(path):
#    if app.debug:
#        return requests.get('http://localhost:8080/{}'.format(path)).text
#    return render_template("index.html")

@app.route('/sitemap.xml', methods=['GET'])
def sitemap():
    return render_template('sitemap.xml')


@app.route('/robots.txt', methods=['GET'])
def robots():
    return render_template('robots.txt')


@app.route('/.well-known/acme-challenge/WV_GrgZFE_iPl3-Vqz1oU1UX7Jgboq3sA68fk0TtZtI', methods=['GET'])
def challenge1():
    return render_template('WV_GrgZFE_iPl3-Vqz1oU1UX7Jgboq3sA68fk0TtZtI.txt')


@app.route('/.well-known/acme-challenge/qFjkk9kTGsFxMlnjpW9fgQWz6en8rkrdIAF3dlufGs0', methods=['GET'])
def challenge2():
    return render_template('qFjkk9kTGsFxMlnjpW9fgQWz6en8rkrdIAF3dlufGs0.txt')


@app.route('/faq')
def faq():
    url_style_normalize = url_for('static', filename='css/normalize.css')
    url_style_skeleton = url_for('static', filename='css/skeleton.css')
    url_style = url_for('static', filename='css/style.css')
    url_script = url_for('static', filename='js/script.js')
    url_favicon = url_for('static', filename='img/logo_large.png')

    return render_template('faq.html',
                           style=url_style,
                           script=url_script,
                           style_normalize=url_style_normalize,
                           style_skeleton=url_style_skeleton,
                           favicon=url_favicon)


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


@app.route('/convert', methods=['POST'])
def convert():
    folder = '/tmp'

    f = request.files.get('photo')

    f.save(os.path.join(folder, f.filename))

    final_uploaded_filepath = os.path.join(folder, f.filename)
    final_uploaded_filename = os.path.splitext(basename(final_uploaded_filepath))[0]
    final_converted_filename = os.path.join(folder, final_uploaded_filename)

    bash_command = "tifig " + final_uploaded_filepath + " -o " + final_converted_filename + ".jpg"
    process = subprocess.Popen(bash_command.split(), stdout=subprocess.PIPE, stderr=subprocess.STDOUT, close_fds=True)
    output_conversion = process.stdout.read()
    output, error = process.communicate()

    public_url = final_uploaded_filename + '.jpg'

    image = Image.open(final_converted_filename + '.jpg')
    os.remove(final_converted_filename + '.jpg')
    for orientation in ExifTags.TAGS.keys():
        if ExifTags.TAGS[orientation] == 'Orientation':
            break
    exif = dict(image._getexif().items())

    if exif[orientation] == 3:
        image = image.rotate(180, expand=True)
    elif exif[orientation] == 6:
        image = image.rotate(270, expand=True)
    elif exif[orientation] == 8:
        image = image.rotate(90, expand=True)
    image.save(final_converted_filename + '.jpg', quality=70, optimize=True)

    blob = bucket_uploads.blob(f.filename)
    blob.upload_from_filename(final_converted_filename + '.jpg')

    if error is not None and len(str(error)) > 0:
        return str(error), 411
    elif output_conversion is not None and len(str(output_conversion)) > 0:
        return str(output_conversion), 411
    else:
        return public_url, 200


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5050))
    app.run(host='0.0.0.0', port=port)
