# polymer-redux-firebase

Project template for Polymer/Redux/Firebase applications

## Usage

First, create an application on [Firebase](https://console.firebase.google.com). You will need the ID and other configuration when running the template.

Second, create an empty (no README.md) project on [GitHub](https://github.com). You will need the GitHub user and project names when running the template.

Third, enable the project on [TravisCI](https://travis-ci.org) and [Coveralls](https://coveralls.io)

Then generate the project boilerplate...

```shell
cookiecutter https://github.com/pghalliday-cookiecutter/polymer-redux-firebase.git
```
Then add your [Firebase](https://console.firebase.google.com) and [SauceLabs](https://saucelabs.com) credentials to the TravisCI config...

```shell
cd <project name>
travis encrypt FIREBASE_TOKEN=<your firebase token> --add
travis encrypt SAUCE_USERNAME=<your saucelabs username> --add
travis encrypt SAUCE_ACCESS_KEY=<your saucelabs access key> --add
```

Then push to GitHub...

```shell
git init
git add -A
git commit -m "boiler plate"
git remote add origin <github repository>
git push
```
