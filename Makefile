install:
	pip install -t lib -r requirements.txt

dev:
	npm run serve
	export FLASK_DEBUG=1
	python main.py

build:
	npm run build
	npm start
	export FLASK_DEBUG=0
	python main.py
