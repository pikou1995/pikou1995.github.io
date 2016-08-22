```html
<script src="https://staticfile.qnssl.com/highlight.js/9.0.0/highlight.min.js"></script>
<script src="https://staticfile.qnssl.com/marked/0.3.5/marked.min.js"></script>
<script>
    marked.setOptions({
        highlight: function (code) {
            return hljs.highlightAuto(code).value;//hljs是highlight.js的handle
        }
    });
</script>
```