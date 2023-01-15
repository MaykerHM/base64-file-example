const main = document.getElementById('main')
const node = document.createElement('li')

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  }
}
function createIframe(file) {
  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', `data:${file.mimetype};base64, ${file.base64}`)
  iframe.setAttribute('width','800px')
  iframe.setAttribute('height','600px')
  main.appendChild(iframe)
}

function createLink(file) {
  let buffer=Uint8Array.from(atob(file.base64), c => c.charCodeAt(0));
  let blob=new Blob([buffer], { type: file.mimetype });
  let url=URL.createObjectURL(blob);

  const a = document.createElement('a')
  a.text = 'link para outra aba com o arquivo'
  a.setAttribute('href', url)
  a.setAttribute('target', 'blank')
  const p = document.createElement('p')
  p.appendChild(a)
  main.appendChild(p)
}

const response = fetch('http://localhost:80/api/file/63c47d095e780aa775b03589', options)
  .then(response => response.json().then(data => {
    data.encodedFiles.forEach(file => {
    //Criar iframe com a imagem
    createIframe(file)

    //Criar url para navegar para uma aba com o arquivo
    createLink(file)
    })
  }))
main.appendChild(node)