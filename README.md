# CS 2212 Team 3 Group Project
Project repo for Team 3 of CS 2212.

### Notes
* The project website is setup under the `docs/` directory, so all files in this directory are accessible to the public.
* A dev-site branch was created for making changes to the website. Make changes to this branch before merging with master.

### Development/Team Member Setup Instructions

Instructions for setting up EmptyMyFridge for development in IntelliJ:

1. Open IntelliJ & from the welcome screen, choose Check out from Version Control -> Github
2. Signin to your github account, and choose **jordansne/team3-gproject** as the repository. Choose a parent directory where the the repo directory will be downloaded to. Choose a directory name of your liking. Clone.
3. When asked if you want to create a project for the sources, choose **Yes**.
4. Leave Create project from existing sources selected. **Next**.
5. Choose a project name if you would like. **Next**.
6. Click **Next** again and then **Finish**.
7. Since development is taking place in the dev branch, in the bottom right corner, change the branch to **origin/dev**, then **Checkout as new local branch**. Keep the branch name the same.
8. The module will now have to be converted to a grails module by removing the old one and creating a new one. Go to **File** -> **Project Structure** -> **Project** (under Project Settings) and select a Java SDK if there is not one already.
9. Next go to **Modules**, and click the only module shown. Click the **-** to remove it.
10. Click the **+** to add a new module. Click **Grails** and enter your module SDK and Grails SDK Home if needed and ensure create-app is selected. **Next**.
11. Give the module the name **'EmptyMyFridge'** exactly (needed to keep gradle build tool settings correct), but change the Content root and Module file location to the project's root directory (i.e. the repo directory). **Finish**. **Ok**.
12. Now wait for IntelliJ to begin and finish indexing files and setting up the project. 
13. When it is finished we will have to remove a duplicated line in settings.gradle that IntelliJ adds automatically. To fix this, right click **settings.gradle** -> **Git** -> **Revert Changes** -> **Revert**.

**New Instructions for setting up a gradle build configuration**

14. Next, we will have to add a Gradle build/run configuration so our dependencies will be built whenever grails is ran. In the top bar go to **Run** -> **Edit Configurations**
15. Click the **+** in the top left corner and choose Gradle. Give it a name of your choice. Click the folder icon next to the Gradle Project textbox and choose **EmptyMyFridge**. In the task textbox, type: **bootRun**. Click **OK**.
16. Now that Gradle is configured, you can run Grails by ensuring in the top right corner of IntelliJ that the correct run configuration is selected, and hitting the green start button. A window should appear and show the progress of the build. Once it reaches ***bootRun***, wait a moment and then the grails app can be opened in your browser at ***http://localhost:8080/***

Note: If an HTML or CSS file is edited while Grails is running, the changes can be seen by refreshing your browser. However, any edits to JavaScript files will have to be re-bundled. This can be achieved by choosing Gradle in the vertical toolbar on the right of the window. Opening **Tasks** -> **other** -> Double clicking **rebundle**. Open success, refresh your browser to see the changes.

Don't forget to create a feature branch before committing your changes and merge back to dev only when that feature is complete! (Unless it is a simple edit)
