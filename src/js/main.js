// const { LoaderTargetPlugin } = require("webpack");

window.addEventListener('DOMContentLoaded', () => {

    // tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fadeIn');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fadeIn');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer
    const deadline = '2022-07-21';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()) - 10800000;
        
        if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / (1000 * 60) % 60));
            seconds = Math.floor((t / 1000) % 60);
        }
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num; 
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]');
    // const modalCloseBtn = document.querySelectorAll('[data-close]');
    const modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // clearInterval(modalTimerId);
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // modalCloseBtn.forEach(item => {
    //     item.addEventListener('click', closeModal);
    // });
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Use class for product cards

    class ProductCard {
        constructor(img, alt, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); 
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
                
            this.parent.append(element);
        }
    }

    const getResource = async (url, data) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    //1-ый Способ через конструктор(шаблон)
    // getResource ('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new ProductCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    //2-ой способ создания карточек товара через функцию, но лишаемся ШАБЛОНИЗАЦИИ. Чтобы построить что-то один раз.
    // getResource ('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    //3 Использование библиотеки Axios
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new ProductCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // Forms. Delivery data to server and from server
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach (item => {
        bindPostData(item);
    });
    
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showModalDialog(message.success);
                statusMessage.remove();
            }).catch(() => {
                showModalDialog(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }
    function showModalDialog (message) {
        const prevMovalDialog = document.querySelector('.modal__dialog');
        prevMovalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevMovalDialog.classList.add('show');
            prevMovalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    //Slider
        const buttonOfferPrev = document.querySelector('.offer__slider-prev'),
                buttonOfferNext = document.querySelector('.offer__slider-next'),
                offerSlider = document.querySelector('.offer__slider'),
                offerSlidesCollection = document.querySelectorAll('.offer__slide'),
                offerCurrentSlide = document.getElementById('current'),
                offerTotalSlide = document.getElementById('total'),
                slidesWrapper = document.querySelector('.offer__slider-wrapper'),
                slidesField = document.querySelector('.offer__slider-inner'),
                widthSlide = window.getComputedStyle(slidesWrapper).width;
    let idSlide = 0;
    let offsetSlide = 0;

    (() => {
        if (offerSlidesCollection.length > 10) {
            offerTotalSlide.textContent = `${offerSlidesCollection.length}`;
            //для усложненного варианта
            offerCurrentSlide.textContent = `${idSlide + 1}`;
        } else {
            offerTotalSlide.textContent = `0${offerSlidesCollection.length}`;
            //для усложненного варианта
            offerCurrentSlide.textContent = `0${idSlide + 1}`;
        }
    })();

    //Создание простого слайдера для блока Offer
    // function hideOfferSlides (i = 0) {
    //     if (i > 8) {
    //         offerCurrentSlide.textContent = `${i + 1}`;
    //     } else {
    //         offerCurrentSlide.textContent = `0${i + 1}`;
    //     }
    //     offerSlidesCollection.forEach((item, j) => {
    //         if (j !== i) {
    //             item.classList.add('hide');
    //             item.classList.remove('show', 'fadeIn');
    //         }
    //     });
    // }
    // hideOfferSlides();

    // function showOfferSlide (i) {
    //     offerSlidesCollection[i].classList.add('show', 'fadeIn');
    //     offerSlidesCollection[i].classList.remove('hide');
    //     hideOfferSlides(i);
    // }
    // buttonOfferNext.addEventListener('click', () => {
    //     idSlide ++;
    //     if (idSlide == offerSlidesCollection.length) {
    //         idSlide = 0;
    //         showOfferSlide(idSlide);
    //     } else {
    //         showOfferSlide(idSlide);
    //     }
    // });
    // buttonOfferPrev.addEventListener('click', () => {
    //     idSlide --;
    //     if (idSlide < 0) {
    //         idSlide = offerSlidesCollection.length - 1;
    //         showOfferSlide(idSlide);
    //     } else {
    //         showOfferSlide(idSlide);
    //     }
    // });

    //Создание навигации для слайдера блока offer
    offerSlider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    offerSlider.append(indicators);

    for (let i = 0; i < offerSlidesCollection.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        indicators.append(dot);
        if (i == 0) {
            dot.classList.add('dot_active');
        }
        dots.push(dot);
    }


    //Создание усложненного слайдера блока offer
    slidesField.style.width = 100 * offerSlidesCollection.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    offerSlidesCollection.forEach(slide => {
        slide.style.width = widthSlide;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            idSlide = slideTo - 1;
            offsetSlide = +widthSlide.slice(0, widthSlide.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offsetSlide}px)`;

            if(offerSlidesCollection.length < 10) {
                offerCurrentSlide.textContent = `0${idSlide + 1}`;
            } else {
                offerCurrentSlide.textContent = `${idSlide + 1}`;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[idSlide].style.opacity = 1;
        });
    });

    buttonOfferNext.addEventListener('click', () => {
        if (offsetSlide == +widthSlide.slice(0, widthSlide.length - 2) * (offerSlidesCollection.length - 1)) {
            offsetSlide = 0;
        } else {
            offsetSlide += +widthSlide.slice(0, widthSlide.length - 2);
        }
        slidesField.style.transform = `translateX(-${offsetSlide}px)`;
        
        if (idSlide == offerSlidesCollection.length - 1) {
            idSlide = 0;
        } else {
            idSlide++;
        }

        if(offerSlidesCollection.length < 10) {
            offerCurrentSlide.textContent = `0${idSlide + 1}`;
        } else {
            offerCurrentSlide.textContent = `${idSlide + 1}`;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[idSlide].style.opacity = 1;
    });
    buttonOfferPrev.addEventListener('click', () => {
        if (offsetSlide == 0) {
            offsetSlide = +widthSlide.slice(0, widthSlide.length - 2) * (offerSlidesCollection.length - 1);
        } else {
            offsetSlide -= +widthSlide.slice(0, widthSlide.length - 2);
        }
        slidesField.style.transform = `translateX(-${offsetSlide}px)`;

        if (idSlide == 0) {
            idSlide = offerSlidesCollection.length - 1;
        } else {
            idSlide--;
        }

        if(offerSlidesCollection.length < 10) {
            offerCurrentSlide.textContent = `0${idSlide + 1}`;
        } else {
            offerCurrentSlide.textContent = `${idSlide + 1}`;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[idSlide].style.opacity = 1;
    });
});