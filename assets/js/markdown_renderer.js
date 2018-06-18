// function readTextFile(file)
// {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 var allText = rawFile.responseText;
//                 alert(allText);
//             }
//         }
//     }
//     rawFile.send(null);
// }

var target = document.getElementById('page_body'),
  converter = new showdown.Converter();

fetch('./body.md')
    .then(response => response.text())
    .then(text => converter.makeHtml(text))
    .then(html => target.innerHTML = html)
