<!doctype html>
<html lang="en" class="no-js">
<head>
    <title>
        <g:layoutTitle default="EmptyMyFridge"/>
    </title>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

    <asset:link rel="icon" href="favicon.ico" type="image/x-ico" />

    <asset:stylesheet src="application.css"/>

    <g:layoutHead/>
</head>
<body>
    <header>
        <h1><a href="./">EmptyMyFridge</a></h1>

        <aside id="right">
            <ul>
                <li><a href="./explore">Explore</a></li>
            </ul>
            <div id="userbox"></div>
        </aside>
    </header>

    <div id="grails_layout">
        <g:layoutBody/>
    </div>

    <asset:javascript src="application.js"/>
</body>
</html>
