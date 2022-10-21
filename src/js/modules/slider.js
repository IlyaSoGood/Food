function slider () {
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

    function styleDot () {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[idSlide].style.opacity = 1;
    }
    function changeNumberSlide () {
        if(offerSlidesCollection.length < 10) {
            offerCurrentSlide.textContent = `0${idSlide + 1}`;
        } else {
            offerCurrentSlide.textContent = `${idSlide + 1}`;
        }
    }
    function transformField () {
        slidesField.style.transform = `translateX(-${offsetSlide}px)`;
    }
    function transformString (str) {
        return +str.replace(/\D/g, '');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            idSlide = slideTo - 1;
            offsetSlide = transformString(widthSlide) * (slideTo - 1);

            transformField();
            changeNumberSlide();
            styleDot();
        });
    });

    buttonOfferNext.addEventListener('click', () => {
        if (offsetSlide == +widthSlide.replace(/\D/g, '') * (offerSlidesCollection.length - 1)) {
            offsetSlide = 0;
        } else {
            offsetSlide += transformString(widthSlide) ;
        }
        transformField();
        
        if (idSlide == offerSlidesCollection.length - 1) {
            idSlide = 0;
        } else {
            idSlide++;
        }
        changeNumberSlide();
        styleDot();
    });
    buttonOfferPrev.addEventListener('click', () => {
        if (offsetSlide == 0) {
            offsetSlide = transformString(widthSlide)  * (offerSlidesCollection.length - 1);
        } else {
            offsetSlide -= transformString(widthSlide) ;
        }
        transformField();

        if (idSlide == 0) {
            idSlide = offerSlidesCollection.length - 1;
        } else {
            idSlide--;
        }
        changeNumberSlide();
        styleDot();
    });
}

module.exports = slider;