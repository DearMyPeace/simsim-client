.DEFAULT_GOAL := start
PROJECT_NAME = $(shell node -p "require('./package.json').name")

# ---- Command ---- #

.PHONY : start ios web npm pod clean fclean re test

start:
	npm start

ios:
	npm run ios

web:
	npm run start-react

web-cc:
	npm run start-react --reset-cache

web-build:
	npm run build

npm:
	sudo npm install

pod:
	cd ios && pod install

repod:
	cd ios && pod deintegrate && pod cache clean --all && pod install

ios-open:
	open ios/$(PROJECT_NAME).xcworkspace

asset:
	npx react-native-asset

cc: 
	npx react-native start --reset-cache

clean-web:
	sudo rm -rf node_modules && rm -rf dist

clean-ios:
	sudo rm -rf ./ios/Pods
	sudo rm -rf ./ios/Podfile.lock
	sudo rm -rf ./ios/build

clean-android:
	cd android && ./gradlew clean

fclean-ios: clean-ios
	sudo rm -rf node_modules

re: fclean all

re-web: clean-web npm web
