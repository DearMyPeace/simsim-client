.DEFAULT_GOAL := start

# ---- Command ---- #

.PHONY : start ios web npm pod clean fclean re test

start:
	npm start

ios:
	npm run ios

web:
	npm run start-react

npm:
	sudo npm install

pod:
	cd ios && pod install

repod:
	cd ios && pod deintegrate && pod cache clean --all && pod install

asset:
	npx react-native-asset

clean:
	rm -rf ./node_modules
	rm -rf ./ios/Pods
	rm -rf ./ios/Podfile.lock
	rm -rf ./ios/build

fclean: clean

re: fclean all
