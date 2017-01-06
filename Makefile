.PHONY: all
all: test build

.PHONY: test
test: standard jest

.PHONY: build
build: babel webpack

.PHONY: standard
standard:
	standard

.PHONY: jest
jest:
	jest

.PHONY: babel
babel:
	babel src \
		--out-dir dist \
		--copy-files

.PHONY: webpack
webpack:
	webpack
