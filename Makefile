# ---- Command ---- #

.PHONY : start npm pod clean fclean re test

start:
	npm start

npm:
	sudo npm install

pod:
	cd ios
	pod deintegrate
	pod cache clean --all
	pod install

clean:
	rm -rf ./node_modules
	rm -rf ./ios/Pods
	rm -rf ./ios/Podfile.lock
	rm -rf ./ios/build

fclean: clean
