'use strict';

import $ from 'jquery';
import './slick.min';
import './select2.min';

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

    (function form() {
        if (!document.querySelector('form')) return;

        const form = document.querySelector('.form');
        const genderButtons = [...form.querySelectorAll('.gender')];
        const genderValueInput = form.querySelector('input[name="gender"]');
        const formFieldAge = form.querySelector('.form__field_age');
        const values = [...form.querySelectorAll('span.value')];
        const recommendList = document.querySelector('.list');
        const emptyElem = document.querySelector('.fourth-section__empty');
        const valueInput = document.getElementById('value');

        genderButtons.forEach(g => g.addEventListener('click', selectGender));
        values.forEach(v => v.addEventListener('click', selectValue));

        function selectGender(e) {
            e.preventDefault();

            if (this.classList.contains('active')) return;

            if (document.querySelector('.gender.active')) {
                document.querySelector('.gender.active')
                    .classList.remove('active');
            }

            this.classList.add('active');

            if (formFieldAge.classList.contains('hide')) {
                formFieldAge.classList.remove('hide');
            }

            genderValueInput.value = this.dataset.gender;
        }

        $('select[name="age"]').change(function(){

            if ($('.form__field_value').has('hide')) {
                $('.form__field_value').each(function () {
                    $(this).removeClass('hide');
                    $('.form').removeClass('pb-80');
                })
            }
        });

        function selectValue(e) {

            if (this.classList.contains('active')) {
                this.classList.remove('active');
                recommendList.classList.add('hide');
                emptyElem.classList.remove('hide');
                valueInput.value = '';
                return;
            }

            if (document.querySelector('.value.active')) {

                document.querySelector('.value.active')
                    .classList.remove('active');
                recommendList.classList.add('hide');
                emptyElem.classList.remove('hide');
            }

            this.classList.add('active');
            valueInput.value = this.innerHTML;

            setTimeout(() => {
                recommendList.classList.remove('hide');
                emptyElem.classList.add('hide');
            }, 300)
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
            document.body.classList.add('forbidden-scroll');
        }

        function modalHide(e) {
            const target = e.target;

            if (!target.dataset.close) return;

            modal.classList.remove('active');
            document.body.classList.remove('forbidden-scroll');
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

    (function selectAge() {
        if (!document.querySelector('.select')) return;

        if($('.select').length > 1) {
            $('select').each(function() {
                let $this = $(this).not('.select-search');
                let parent = $(this).not('.select-search').parents('.select');
                $this.select2({
                    minimumResultsForSearch: Infinity,
                    dropdownParent: parent
                });
            });
            $('.select-search').each(function() {
                let $this = $(this);
                let parent = $(this).parents('.select');
                $this.select2({
                    dropdownParent: parent
                });
            });
        } else {
            $('select').select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $('.select')
            });
        }
    })();

    (function cookie() {
        if (!window.localStorage.getItem('isCookie')) {
            const elem = `<div class="cookie">
  <div class="container">
    <p class="text">Мы используем файлы cookies для обработки статистических данных использования сайта. 
    <br>Нажимая кнопку «СОГЛАСЕН», вы даете согласие на обработку ваших cookies файлов.</p>
    <a href="#" class="cookie-btn btn">СОГЛАСЕН</a>
  </div>
</div>`;
            document.body.insertAdjacentHTML('beforeend', elem);
            document.querySelector('.cookie-btn')
                .addEventListener('click', e => {
                    e.preventDefault();

                    window.localStorage.setItem('isCookie', 'true');
                    document.body.removeChild(document.querySelector('.cookie'));
                })
        }
    })();

});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}