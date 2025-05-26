window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['node', 'chrome', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    const appVersion = document.getElementById('app-version')
    appVersion.innerText = process.versions.node
})