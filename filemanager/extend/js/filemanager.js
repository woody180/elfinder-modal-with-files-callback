const Filemanager = function() {

    this.optionsObj = arguments[0];
    this.baseUrl = this.optionsObj.baseUrl ? this.optionsObj.baseUrl : location.origin;

    const loadDeps = (cssOrJs, arrDeps, headOrBody) => {
        
        arrDeps.forEach(link => {
            const elem = document.createElement(cssOrJs);
            const attr = cssOrJs === 'script' ? 'src' : 'href';

            if (attr === 'href') elem.setAttribute('rel', 'stylesheet')
            if (attr === 'src') elem.setAttribute('type', 'text/javascript')

            elem.setAttribute(attr, `${this.baseUrl}/${link}`);

            document.querySelector(headOrBody).insertAdjacentElement('beforeend', elem);
        });
    };

    const deps = function() {
        const depsCSS = ['filemanager/extend/css/jquery-ui.css', 'filemanager/extend/css/filemanager.css', 'filemanager/css/elfinder.min.css', 'filemanager/css/theme.css']
        const depsJS = ['filemanager/js/elfinder.min.js', 'filemanager/js/extras/editors.default.min.js' /*, 'filemanager/extend/js/filemanagerModal.js' */];

        loadDeps('link', depsCSS, 'head');
        loadDeps('script', depsJS, 'body');
    };

    (() => {
        deps()
    })()
}




// Open filemanager
Filemanager.prototype.fmOpen = function(callback) {
    let fmHTML = `<div class="filemanager-container">
        <div class="pb-fm-header">
            <div class="pb-fm-heading">Page builder File manager</div>
            <div onclick="(function(){ document.querySelector('.filemanager-container').remove(); })()" class="pb-fm-close uk-flex uk-flex-center uk-flex-middle" style="width: 30px; height: 30px;"><svg class="fg-editor-icon" style="width: 15px; height: 15px;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 348.333 348.334" xml:space="preserve"> <g> <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85 c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563 c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85 l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554 L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"></path> </g> </svg></div>
        </div>
        <div id="elfinder"></div>
    </div>`;

    // elFinder add new function + icon to context menu
    elFinder.prototype.commands.Insert = function() {
        this.exec = function(hashes) {
            let urlsArr = [];
            hashes.forEach(hs => {
                var file = this.files(hs);
                var hash = file[0].hash;
                var fm = this.fm;
                var url = fm.url(hash);
                urlsArr.push(url);
            });
            
            $('#elfinder').remove();
            $('.filemanager-container').remove();
            callback(urlsArr);
            
            return hashes;
        }
        this.getstate = function() {
            var sel = this.files(sel),
            cnt = sel.length;
            return !this._disabled && cnt ? 0 : -1;
        }
    };

    console.log(this.baseUrl);
    
    // elFinder options
    let options = {
        soundpath: `${this.baseUrl}/filemanager/sounds/`,
        baseUrl: this.baseUrl,
        // Load themes
        // cssAutoLoad: [
        //     `${location.origin}/filemanager/themes/windows-10/css/theme.css`, 
        // ],
        uiOptions: {
            // toolbar: [
            //     ['back', 'forward'],
            //     ['mkdir', 'upload', 'download'],
            //     ['rename', 'resize'],
            //     ['extract', 'archive'],
            //     ['quicklook', 'rm', 'info'],
            //     ['search'],
            // ],
        },
        // commands: [
        //     'Insert','open', 'reload', 'home', 'up', 'back', 'forward', 'getfile', 'quicklook', 
        //     'download', 'rm', 'duplicate', 'rename', 'mkdir', 'mkfile', 'upload', 'copy', 
        //     'cut', 'paste', 'edit', 'extract', 'archive', 'search', 'info', 'view', 'help', 'resize', 'sort', 'netmount'
        // ],
        contextmenu: {
            // navbar: ['open', '|', 'copy', 'cut', 'paste', 'duplicate', '|', 'rm', '|', 'info'],
            // files: [
            //     'Insert', 'open', 'quicklook', '|', 'download', '|', 'copy', 'cut', 'paste', '|',
            //     'rm', '|', 'edit', 'rename', 'resize', '|', 'archive', 'extract', '|'
            // ],
            // cwd: ['reload', 'back', '|', 'upload', 'mkdir', 'paste', '|', 'info'],
        },
        getfile: {
            multiple: true
        },
        // This is important! Prevent opening file in popup
        // Putting image / file path into 'getFile' variable (array)
        getFileCallback: (file, fm) => {
            callback([file.url]);

            $('#elfinder').remove();
            $('.filemanager-container').remove();
        },
        url: `${this.baseUrl}/filemanager/php/connector.minimal.php`,
    };

    $(document.body).append(fmHTML);

    // If user options 
    if (this.optionsObj.config) {this.optionsObj.config = {...this.optionsObj.config, ...options} }
    const elfinderOptions = this.optionsObj.config ? this.optionsObj.config : options;

    setTimeout(() => {
        $('#elfinder').elfinder(elfinderOptions).elfinder('instance');
    }, 300);
}