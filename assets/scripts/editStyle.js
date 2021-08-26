export function editStyleForBrand(brand) {
    console.log(brand)
    
    addBrandForGeneralBlock(brand)
    
}


function editLogo(brand) {
    let strBrand = String(brand).toLowerCase()
    let logoHeader = document.querySelector('.header__logo img')
    let logoHeaderMobileMenu = document.querySelector('.burger-menu__top img')
    let logoFooter = document.querySelector('.footer__logo img')
    let logoFooterText = document.querySelector('.footer__logo p')
    if (strBrand === 'lada') {
        logoHeader.setAttribute('src','assets/images/logo/lada-logo.svg')
        logoHeaderMobileMenu.setAttribute('src', 'assets/images/logo/lada-logo.svg')
        logoHeaderMobileMenu.style.maxWidth = '30px'
        logoFooter.setAttribute('src', 'assets/images/logo/lada-logo.svg')
        logoFooterText.innerHTML = 'Lada 2021'
    }
}

function addBrandForGeneralBlock(brand) {
    let generalBlock = document.querySelector('.protection')
    generalBlock.classList.add(String(brand).toLowerCase())
    editLogo(brand)
}

