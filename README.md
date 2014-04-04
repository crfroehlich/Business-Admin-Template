Business-Admin-Template
=======================

The compile task to make sense of the Business Admin Template. If you've purchased http://themeforest.net/item/business-admin-template/6674668,
you can use this to help scaffolding/compiling the template.

* Download the zip and extract locally.
* Install node
* Install gulp and bower

```
npm install -g gulp
npm install -g bower
```

* Install the package
* Install the bower packages
* Compile the template

```
npm install
bower install
gulp compile
```

This will correctly resolve all of the 3rd party dependencies and inject them into the /src/dev.html and /dist/release.html pages.
None of the actual HTML from the template is include--you should purchase it if you want to use it.
Once you have, simply extract the content within  <!-- // Main Container Fluid --> from the template page and paste it into dev.html/release.html.

There are still a few issues:

-Top side nav button is hidden beneath header
-Some graphs and charts are not rendering correctly
-A few glyphicons are not rendering
-Various JavaScript errors in the console

Feel free to contribute.
