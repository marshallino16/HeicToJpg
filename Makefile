install:
	pip install -t lib -r requirements.txt

dev:
	cd app && npm run serve && cd ..
	export FLASK_DEBUG=1
	python main.py

build:
	pwd
	cd app && npm run build && cd ..
	export FLASK_DEBUG=0
	python main.py
