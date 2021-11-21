'use strict';

import $ from 'jquery';
import './slick.min';

const mobileWidth = 767;
let isMobile = checkWidth();

window.addEventListener('resize', () => {
    isMobile = checkWidth();
});

setTimeout(() => {
    if (!document.querySelector('.loader')) {
        return;
    }

    const loader = document.querySelector('.loader');
    if (loader.classList.contains('active')) {
        loader.classList.remove('active');

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 300)
    }
}, 2500);

window.addEventListener('load', function () {

    (function loader() {
        if (!document.querySelector('.loader')) {
            return;
        }

        const loader = document.querySelector('.loader');

        if (loader.classList.contains('active')) {
            loader.classList.remove('active');
        }

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 1500);

    })();

    (function slider() {
        if (!document.querySelector('.second-section__slider')) return;

        $('.second-section__slider').slick({
            variableWidth: true,
            slidesToScroll: 1,
            infinite: true,
            prevArrow: '<span class="slider-arrow prev"></span>',
            nextArrow: '<span class="slider-arrow next"></span>',
        })
    })();

    (function toggleClasses() {
        if (!document.querySelector('[data-toggle]')) return;

        const elementsToToggle = [...document.querySelectorAll('[data-toggle]')];
        elementsToToggle.forEach(t =>
            t.addEventListener('click', () =>
                t.classList.toggle('active')));
    })();

    (function form() {
        if (!document.querySelector('form')) return;

        const form = document.querySelector('.form');
        const genderButtons = [...form.querySelectorAll('.gender')];
        const genderValueInput = document.querySelector('input[name="gender"]');
        // const valueValueInput = document.querySelector('input[name="value"]');

        genderButtons.forEach(g => g.addEventListener('click', selectGender));

        function selectGender(e) {
            e.preventDefault();

            if (this.classList.contains('active')) return;

            if (document.querySelector('.gender.active')) {
                document.querySelector('.gender.active')
                    .classList.remove('active');
            }

            this.classList.add('active');
            genderValueInput.value = this.dataset.gender;
        }
    })();

    (function scrollToForm() {
        if (!document.querySelector('[data-scroll]')) return;

        const btn = document.querySelector('[data-scroll="form"]');

        btn.addEventListener('click', function (e) {
            e.preventDefault();

            if (this.dataset.scroll) {
                const id = this.dataset.scroll;
                scrollTo(id);
            }
        });

        function scrollTo(id) {
            const element = document.getElementById(id);

            const y = element.getBoundingClientRect().top + window.scrollY;

            window.scroll({
                top: y,
                behavior: 'smooth'
            });
        }
    })();

    (function modal() {
        if (!document.querySelector('.modal')) return;

        const modalButtons = [...document.querySelectorAll('.list__item_btn')];
        const modal = document.querySelector('.modal');
        const modalText = modal.querySelector('.modal__text');

        modal.addEventListener('click', modalHide);
        modalButtons.forEach(m => m.addEventListener('click', modalShow));
        modalText.addEventListener('click', displayText);

        function modalShow(e) {
            e.preventDefault();
            modal.classList.add('active');
        }

        function modalHide(e) {
            const target = e.target;

            if (!target.dataset.close) return;

            modal.classList.remove('active');
        }

        function displayText(e) {
            const target = e.target;

            if (!target.classList.contains('modal__text_more')) return;

            if (this.classList.contains('active')) {
                target.innerHTML = 'Показать подробную информацию';
            } else {
                target.innerHTML = 'Скрыть';
            }

            this.classList.toggle('active');
        }
    })();

});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}