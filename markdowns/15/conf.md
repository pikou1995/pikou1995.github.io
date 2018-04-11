.vimrc 配置

```
set formatoptions=tcrqn
set tabstop=2
set shiftwidth=2
set softtabstop=2
set backspace=2
set expandtab
set ai
set si
set nu
set ruler
set showcmd
set showmatch
set hlsearch
set ignorecase
set incsearch
" 粘贴的时候不会自动添加注释
set paste
" 输入:set list命令是应该显示些啥？
set listchars=tab:\|\ ,trail:.,extends:>,precedes:<,eol:$
" 光标移动到buffer的顶部和底部时保持n行距离
set scrolloff=3
" 总是显示状态行
set laststatus=2
set statusline=%2*%n%m%r%h%w%*\ %F\ %1*[FORMAT=%2*%{&ff}:%{&fenc!=''?&fenc:&enc}%1*]\ [TYPE=%2*%Y%1*]\ [COL=%2*%03v%1*]\ [ROW=%2*%03l%1*/%3*%L(%p%%)%1*]\

syntax enable
syntax on

filetype on
filetype plugin on
filetype indent on

colorscheme delek

set fileencodings=utf-8,ucs-bom,gb18030,gbk,gb2312,cp936
set termencoding=utf-8
set encoding=utf-8
```

.vscode/setting.json

```json
{
    "editor.renderIndentGuides": true,
    "editor.renderWhitespace": "all",
    "editor.scrollBeyondLastLine": false,
    "editor.wordWrap": "wordWrapColumn",
    "editor.wordWrapColumn": 120,
    "editor.tabSize": 4,
    "editor.detectIndentation": false,
    "workbench.activityBar.visible": false,
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    "terminal.integrated.commandsToSkipShell": [
        "editor.action.toggleTabFocusMode",
        "workbench.action.debug.continue",
        "workbench.action.debug.restart",
        "workbench.action.debug.run",
        "workbench.action.debug.start",
        "workbench.action.debug.stop",
        "workbench.action.openNextRecentlyUsedEditorInGroup",
        "workbench.action.openPreviousRecentlyUsedEditorInGroup",
        "workbench.action.showCommands",
        "workbench.action.terminal.clear",
        "workbench.action.terminal.copySelection",
        "workbench.action.terminal.focus",
        "workbench.action.terminal.focusAtIndex1",
        "workbench.action.terminal.focusAtIndex2",
        "workbench.action.terminal.focusAtIndex3",
        "workbench.action.terminal.focusAtIndex4",
        "workbench.action.terminal.focusAtIndex5",
        "workbench.action.terminal.focusAtIndex6",
        "workbench.action.terminal.focusAtIndex7",
        "workbench.action.terminal.focusAtIndex8",
        "workbench.action.terminal.focusAtIndex9",
        "workbench.action.terminal.focusNext",
        "workbench.action.terminal.focusPrevious",
        "workbench.action.terminal.kill",
        "workbench.action.terminal.new",
        "workbench.action.terminal.runActiveFile",
        "workbench.action.terminal.runSelectedText",
        "workbench.action.terminal.scrollDown",
        "workbench.action.terminal.scrollDownPage",
        "workbench.action.terminal.scrollToBottom",
        "workbench.action.terminal.scrollToTop",
        "workbench.action.terminal.scrollUp",
        "workbench.action.terminal.scrollUpPage",
        "workbench.action.terminal.toggleTerminal"
    ],
    "window.zoomLevel": -1,
    "files.trimTrailingWhitespace": true,
    "files.trimFinalNewlines": true,
    "files.insertFinalNewline": true,
    "files.watcherExclude": {
        "**/.git/objects/**": true,
        "**/node_modules/**": true,
        "**/vendor/**": true
    },
    "files.associations": {
        "*.wxss": "css",
        "*.wxml": "html"
    },
    "emmet.triggerExpansionOnTab": true,
    "html.format.wrapLineLength": 0,
    "html.suggest.angular1": false,
    "vim.easymotion": true,
    "vim.leader": ",",
    "git.enableSmartCommit": true,
    "git.confirmSync": false,
    "git.autofetch": true,
    "gitlens.advanced.messages": {
        "suppressCommitHasNoPreviousCommitWarning": false,
        "suppressCommitNotFoundWarning": false,
        "suppressFileNotUnderSourceControlWarning": false,
        "suppressGitVersionWarning": false,
        "suppressLineUncommittedWarning": false,
        "suppressNoRepositoryWarning": false,
        "suppressResultsExplorerNotice": false,
        "suppressShowKeyBindingsNotice": true,
        "suppressUpdateNotice": true,
        "suppressWelcomeNotice": true
    },
    "vetur.validation.template": false,
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "vetur.format.defaultFormatter.ts": "vscode-typescript",
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {}
    },
    "java.errors.incompleteClasspath.severity": "ignore",
    "npm-intellisense.importLinebreak": "\n",
    "workbench.colorTheme": "Monokai",
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "vue",
        "vue-html"
    ],
    "php.suggest.basic": false,
    "php.executablePath": "/usr/local/php5/bin/php",
    "explorer.confirmDelete": false,
    "vim.useSystemClipboard": false,
    "extensions.autoUpdate": true,
    "blade.format.enable": true,
    "gitlens.keymap": "chorded"
}
```
