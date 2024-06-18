# 심심조각 (Dear My Peace)

- [**React Native**](https://reactnative.dev)
- bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
- Web, Android, iOS 동시 개발 진행

## Commit Convention

```ts
################
# feat : 새로운 기능 추가
# fix : 버그 수정
# design : CSS 등 사용자 UI 디자인 변경
# refactor : 코드 리팩토링
# comment : 필요한 주석 추가 및 변경
# docs : 문서 수정
# test : 테스트 코드 추가
# chore : 코드 의미에 영향을 주지 않는 변경사항
# build : 빌드에 필요한 요소 수정 사항
# !HOTFIX	급하게 치명적인 버그를 고쳐야하는 경우
# !BREAKING CHANGE:	커다란 API 변경의 경우
################
```

</br>

## Makefile

```Makefile
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

clean:
	rm -rf ./node_modules
	rm -rf ./ios/Pods
	rm -rf ./ios/Podfile.lock
	rm -rf ./ios/build

re: fclean all

```
