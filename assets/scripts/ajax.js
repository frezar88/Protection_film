export async function requestRun(url, method, body) {
    let domain = url,
        meth = method;
    let response = await fetch(domain, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        showErrorBlock(response.status)
        return
    };
    if (method==='GET') {
        return response.json();
    }
    
}

function showErrorBlock(status) {
    let spiner = document.querySelector('.spiner')
    let wrapper = document.querySelector('.protection__wrapper')
    spiner.remove()
    wrapper.remove()
    createErrorBlock(status)
}

function createErrorBlock(status) {
    let generalContainer = document.querySelector('.protection')
    let errorBlock = document.createElement('div')
    errorBlock.classList.add('error')
    if (status ===422) {
        errorBlock.innerHTML = `<p>Страница не доступна:<br/>Невалидный параметр 'id'.</p>`
    } else if (status === 404) {
        errorBlock.innerHTML = `<p>Страница не доступна:<br/>Указанный опросник не найден.</p>`
    }
    
    generalContainer.appendChild(errorBlock)
}