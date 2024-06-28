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

clean:
	rm -rf ./node_modules
	rm -rf ./ios/Pods
	rm -rf ./ios/Podfile.lock
	rm -rf ./ios/build

clean-android:
	cd android && ./gradlew clean

fclean: clean

re: fclean all
