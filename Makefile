.PHONY: test
test:
	./node_modules/mocha/bin/mocha \
		test/*.js \
		test/options/*.js
