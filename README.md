# CS 2212 Team 3 Group Project
Project repo for Team 3 of CS 2212.

### Notes
* The project website is setup under the `docs/` directory, so all files in this directory are accessible to the public.
* A dev-site branch was created for making changes to the website. Make changes to this branch before merging with master.

### Development Setup

Instructions for setting up EmptyMyFridge for development all in IntelliJ:

1. Open IntelliJ & from the welcome screen, choose Check out from Version Control -> Github
2. Signin to your github account, and choose **jordansne/team3-gproject** as the repository. Choose a directory name of your liking. Clone.
3. When asked if you want to create a project for the sources, choose **Yes**.
4. Leave Create project from existing sources selected. **Next**.
5. Choose a project name if you would like. **Next**.
6. Click **Next** again and then **Finish**.
7. Since development is taking place in the dev branch, in the bottom right corner, change the branch to **origin/dev**, then **Checkout as new local branch**. Keep the branch name the same.
8. The module will now have to be converted to a grails module by removing the old one and creating a new one. Go to **File** -> **Project Structure** -> **Project** (under Project Settings) and select a Java SDK if there is not one already.
9. Next go to **Modules**, and click the only module shown. Click the **-** to remove it.
10. Click the **+** to add a new module. Click **Grails** and enter your module SDK and Grails SDK Home if needed and ensure create-app is selected. **Next**.
11. Give the module the name **'EmptyMyFridge'** exactly (needed to keep gradle settings correct), but change the Content root and Module file location to the project's root directory. **Finish**. **Ok**.
12. IntelliJ will now build the gradle project, however when this is setup a line is duplicated in settings.gradle. To fix this, right click **settings.gradle** -> **Git** -> **Revert Changes** -> **Revert**.
12. IntelliJ is now setup, and grails can be run directly from IntelliJ.
