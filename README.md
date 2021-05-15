# Easy elFidner file manager modal plugin

Require only one file to include from this path - ```filemanager/extend/js/filemanager.js```

elFinder works with jquery and jquery ui javascript files. So we must include them as well. Both of them are includes inside package. Put them inside the head of the file. Other dependences will be included automatically.

```
    <script src="filemanager/extend/js/jquery-3.6.0.min.js"></script>
    <script src="filemanager/extend/js/jquery-ui.js"></script>
```

# Initialize
```
const filemanager = new Filemanager();
```

# Open file manager
```
const filemanager = new Filemanager();
filemanager.fmOpen();
```

# Filemanager configuration
First of all you must add base url - the path of the location where file manager directory is located.

*config* parameter gives an ability to configure elFinder file manager it self.

*title* parameter gives title to the modal box

```
const filemanager = new Filemanager({
    baseUrl: 'http://hostname/public/dir/filemanager',
    config: {},
    title: 'File manager'
});
```

# Get files from callback
Files will be return as a callback parameter once file going to be double clicked. You also can select multiple files, right click on them and inside the context menu click on *select files* button.
```
const filemanager = new Filemanager();
filemanager.fmOpen(files => {
    console.log(files)
});
```