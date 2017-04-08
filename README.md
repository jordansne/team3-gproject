# EmptyMyFridge

## About

EmptyMyFridge is a full-stack web app developed on top of the Grails framework. It utilizes a React based front-end to provide a performance driven single page web experience.

## Required Dependencies

- Java JDK v8+
- Gradle v3.4+ (Optional, recommended)

## Installing

### 1. Downloading

First, either clone the repo **or** download the lastest source release.

To clone, run:

```
$ git clone https://github.com/jordansne/team3-gproject.git
```

or download the latest release [here](https://github.com/jordansne/team3-gproject/archive/master.zip).

### 2. Building & Installing

Navigate inside the cloned directory, or the unzipped directory.

If you have Gradle installed on your system:
```
$ gradle build
```

If you do not have Gradle installed on your system, you can use the Gradle wrapper, located inside the directory:
```
$ gradlew
$ gradlew build
```

### 3. Running

After completing the build, you can run the app by running the bootRun task via Gradle:
```
$ gradle bootRun
```

or if you're using Gradle Wrapper:
```
$ gradlew bootRun
```
